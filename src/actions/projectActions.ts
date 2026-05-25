'use server'

import prisma from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addProject(formData: FormData) {
  await prisma.project.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      Images: formData.getAll('images') as string[], // 👈 Grabs the array of hidden inputs
      deployUrl: (formData.get('deployUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
    }
  });
  
  revalidatePath('/');
  revalidatePath('/secret-admin-url');
}

export async function updateProject(id: string, formData: FormData) {
  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      Images: formData.getAll('images') as string[], // 👈 Grabs the array of hidden inputs
      deployUrl: (formData.get('deployUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
    }
  });
  
  revalidatePath('/');
  revalidatePath('/secret-admin-url');
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/secret-admin-url');
}
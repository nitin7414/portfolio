import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // Prisma v7 requires an adapter instead of the old 'datasources' object
  const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL as string 
  })
  
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
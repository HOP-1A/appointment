import { prisma } from "@/lib/prisma";

const Page = async ()=>{
    const data =  await prisma.bookTime.findMany()
    
    
return <div>admin</div>
}
export default Page;
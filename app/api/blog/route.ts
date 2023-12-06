import prisma from "@/prisma";
import { NextResponse } from "next/server";
// connection request
export async function main(){
    try {
        await prisma.$connect();
        console.log("Database connection established")
    } catch (error) {
        return Error("Database Disconnected")
    }
    
}
// Get all posts
export const GET = async(req: Request, res: NextResponse)=>{
   
    try {
        // 17th line connect our database
        await main()
        const posts = await prisma.pOST.findMany();
        return NextResponse.json({message:"Success",posts},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
    // this finally block disconnect our database
    finally{
     await prisma.$disconnect()
    }
}
// Create new Post 
export const POST = async(req: Request, res: NextResponse)=>{
    
    try {
        const {title,description}= await req.json();
        // connect to our database
        await main();
        const post = await prisma.pOST.create({data:{title,description}})
        return NextResponse.json({message:"Success",post},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})  
    }
       // this finally block disconnect our database
    finally{
        await prisma.$disconnect()
    }
}
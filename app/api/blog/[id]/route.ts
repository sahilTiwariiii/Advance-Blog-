import prisma from "@/prisma";

import { NextResponse } from "next/server";
import { main } from "../route";

// Get single post by its id
export const GET = async(req:Request,res:NextResponse)=>{
try {
     const id= req.url.split('/blog/')[1];
    // connected to database
    await main();
    const post=await prisma.pOST.findFirst({where:{id}})
    if(!post){
        return NextResponse.json({message:"Not Found"},{status:404});
    }
    return NextResponse.json({message:"Success",post},{status:200});
    
} 
catch (error) {
    return NextResponse.json({message:"Error",error},{status:500})
}
// disconnect from database
finally{
    await prisma.$disconnect()
}
}

// PUT=> Edit a post  Update a Post
export const PUT = async(req: Request, res: NextResponse)=>{
    try {
        const id= req.url.split('/blog/')[1];
        const {title,description}= await req.json();
        await main();
        const post = await prisma.pOST.update({
            data:{title,description},
            where:{id}
        })
        return NextResponse.json({message:"Success",post},{status:200});
    } 
    catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
    finally{
        await prisma.$disconnect()
    }
}

// DELETE delete post by id
export const DELETE = async(req:Request,res:NextResponse)=>{
    try {
        const id= req.url.split('/blog/')[1];
        await main();
        const post = await prisma.pOST.delete({where:{id}})
        return NextResponse.json({message:"Success",post},{status:200});
    }
     catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
    finally{
        await prisma.$disconnect()
    }
}
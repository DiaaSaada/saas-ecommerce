import { PrismaClient } from "@prisma/client";
import { PrismaService } from "./../src/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {



    for (let i = 100; i < 110; i++) {
        let cat = await prisma.category.create({
            data: {

                name: `${faker.word.noun()}-${i}`,
                description: faker.commerce.productDescription(),
                image:faker.image.fashion(),

            }
        })

        for (let i = 0; i < 25; i++) {
            await prisma.product.create({
                data: {

                    name: `${faker.commerce.product()}-${i}`,
                    sku: `P-${cat.id}-${i}`,
                    description: faker.commerce.productDescription(),
                    image: faker.image.fashion(),
                    categoryId: cat.id
                }
            })
        }
    }
    

}


main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    console.log('finally')
    prisma.$disconnect()
})
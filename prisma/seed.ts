
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'nambajeeedwin@gmail.com' },
        update: {},
        create: {
            email: 'nambajeeedwin@gmail.com',
            name: 'Nambaje Edwin',
            password: 'password',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'nambajedwin@gmail.com' },
        update: {},
        create: {
            email: 'nambajedwin@gmail.com',
            name: 'Edwin alex',
            password: 'password1',
        },
    });
    const post1 = await prisma.article.upsert({
        where: { title: 'Prisma Adds Support for MongoDB' },
        update: {
            authorId: user1.id,
        },
        create: {
            title: 'Prisma Adds Support for MongoDB',
            body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
            description:
                "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
            published: false,
            authorId: user1.id,
        },
    });

    const post2 = await prisma.article.upsert({
        where: { title: "What's new in Prisma? (Q1/22)" },
        update: {
            authorId: user2.id,
        },
        create: {
            title: "What's new in Prisma? (Q1/22)",
            body: 'Our engineers have been working hard, issuing new releases with many improvements...',
            description:
                'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
            published: true,
            authorId: user2.id,
        },
    });
    const post3 = await prisma.article.upsert({
        where: { title: 'Prisma Client Just Became a Lot More Flexible' },
        update: {},
        create: {
            title: 'Prisma Client Just Became a Lot More Flexible',
            body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
            description:
                'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
            published: true,
        },
    });

    console.log({ user1, user2, post1, post2, post3 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

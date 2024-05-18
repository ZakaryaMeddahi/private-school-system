'use client';

import { Box, Center, Container, HStack } from "@chakra-ui/react";
import CardForCourse from "@/components/CardForCourse";

export const Courses = [
    {
        Course: {
            img: '/adobe photoshop-unsplash.jpg',
            title: 'Adobe Photoshop',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 0,
        },
        teacher: {
            Name: 'Abdelali Sid Ahmed',
            img: '/john-doe.jpg'
        }
    },
    {
        Course: {
            img: "/backend.jpeg",
            title: 'Node JS',
            description: 'Learn how to use Node JS to create beautiful graphics, websites, and so much more.',
            price: 0,
        },
        teacher: {
            Name: 'Meddahi Zakarya',
            img: '/john-doe.jpg'
        }
    },
    {
        Course: {
            img: '/arduino-unsplash.jpg',
            title: 'Arduino',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 0,
        },
        teacher: {
            Name: 'Meziene Fethi',
            img: '/john-doe.jpg'
        },
    },
    {
        Course: {
            img: '/problem solving.jpg',
            title: 'Problem Solving',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 1000,
        },
        teacher: {
            Name: 'Messafa Mohammed',
            img: '/john-doe.jpg'
        }
    },
    {
        Course: {
            img: '/data-unsplash.jpg',
            title: 'Data Science',
            description: 'Learn how to use data to make informed decisions and predictions.',
            price: 0,
        },
        teacher: {
            Name: 'Tahri Youcef',
            img: '/jane-doe.jpg'
        }
    },
    {
        Course: {
            img: 'appMobile-unsplash.jpg',
            title: 'Mobile Development',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 0,
        },
        teacher: {
            Name: 'Mouaadh Shalia',
            img: '/john-doe.jpg'
        }
    },
    {
        Course: {
            img: '/Django-unsplash.jpg',
            title: 'Django Framework',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 500,
        },
        teacher: {
            Name: 'Messabih Alaa',
            img: '/john-doe.jpg'
        }
    },
    {
        Course: {
            img: '/Frontend-unsplash.jpg',
            title: 'Next JS',
            description: 'Learn how to use Adobe Photoshop to create beautiful graphics, websites, and so much more.',
            price: 0,
        },
        teacher: {
            Name: 'Mehalil Safi El Rahmane',
            img: '/john-doe.jpg'
        }
    },
]

const CoursePage = () => {

  return (
    <Container
            padding={25}
            maxW='100%' 
            h='100%'
            display='grid'
            gridTemplateColumns='repeat(3, 1fr)'
            gap={5}
            overflowY={'auto'}
        >
            {Courses.map((course, index) => (
                <CardForCourse key={index} {...course} Role='student' Enroll={false} />
            ))}
        </Container>
    );
}

export default CoursePage;
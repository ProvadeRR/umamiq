import type {Establishment, Dish} from '../types';

// Mock establishment data based on the provided JSON
export const mockEstablishment: Establishment = {
    _id: {
        $oid: "687f6b87bbf96311980e15c2"
    },
    name: "Huli Huli, Street food",
    domain: "huli-huli",
    placeInfo: {
        name: "Huli Huli, Street food",
        type: "other",
        contactInfo: {
            socialNetworks: {
                instagram: "https://www.instagram.com/huli.huli.dp?igsh=MmN4ODhic3ZtZ2Ns",
                telegram: ""
            },
            website: "",
            email: "",
            phone: "+38 096 000 1344",
            address: {
                prediction: "Volodymyra Vernadskoho St, 1, Dnipro, Dnipropetrovs'ka oblast, Ukraine, 49000",
                country: "Ukraine",
                city: "Dnipro",
                postalCode: "49000",
                location: {
                    coordinates: [35.0553707, 48.4606725],
                    type: "Point"
                }
            }
        },
        companyDescription: "Authentic street food experience with unique flavors and traditional recipes passed down through generations.",
        companyImages: {
            mobile: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800",
            desktop: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1200",
            logo: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=200"
        }
    },
    workTimeAll: [
        { dayOfWeek: 0, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 1, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 2, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 3, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 4, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 5, active: true, from: "11:00:00.000", till: "22:00:00.000" },
        { dayOfWeek: 6, active: true, from: "11:00:00.000", till: "22:00:00.000" }
    ],
    opened: true,
    customize: {
        primaryColor: "#FFA11B",
        menuFavorites: true,
        menuFavoritesCounter: true
    },
    sections: [
        { _id: "674c4743c27787c40d426a86", name: "HULI ЗНАЧОК", description: "", hurl: "section:huli-znachok" },
        { _id: "673a012508d5a54fd7e11aa8", name: "HULI SET", description: "", hurl: "section:huli-set" },
        { _id: "66583503c03c3c30c59230ab", name: "HULI ШАУРМА", description: "", hurl: "section:huli-shaurma" },
        { _id: "66a204b59677921eeb74dd70", name: "HULI МЕНЮ", description: "", hurl: "section:huli-menyu" },
        { _id: "66a36f25c22a8dd474d1767c", name: "HULI ПИВО", description: "", hurl: "section:huli-pivo" },
        { _id: "66a35adcc22a8dd474d16280", name: "HULI НАПОЇ", description: "", hurl: "section:huli-napoyi" },
        { _id: "66ad02e6c35af7314eb9fbb9", name: "HULI АЛКОГОЛЬНІ НАПОЇ", description: "", hurl: "section:huli-alkogolni-napoyi" }
    ]
};

// Additional mock establishments for the home page
export const mockEstablishments: Establishment[] = [
    mockEstablishment,
    {
        ...mockEstablishment,
        _id: { $oid: "687f6b87bbf96311980e15c3" },
        name: "Pizza Corner",
        domain: "pizza-corner",
        placeInfo: {
            ...mockEstablishment.placeInfo,
            name: "Pizza Corner",
            companyDescription: "Authentic Italian pizza made with fresh ingredients and wood-fired ovens.",
            companyImages: {
                mobile: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
                desktop: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1200",
                logo: "https://images.pexels.com/photos/1082343/pexels-photo-1082343.jpeg?auto=compress&cs=tinysrgb&w=200"
            }
        },
        customize: {
            primaryColor: "#E53E3E",
            menuFavorites: true,
            menuFavoritesCounter: true
        }
    },
    {
        ...mockEstablishment,
        _id: { $oid: "687f6b87bbf96311980e15c4" },
        name: "Sushi Master",
        domain: "sushi-master",
        placeInfo: {
            ...mockEstablishment.placeInfo,
            name: "Sushi Master",
            companyDescription: "Fresh sushi and Japanese cuisine prepared by experienced chefs.",
            companyImages: {
                mobile: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800",
                desktop: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1200",
                logo: "https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=200"
            }
        },
        workTimeAll: [
            { dayOfWeek: 0, active: false, from: "00:00:00.000", till: "00:00:00.000" },
            { dayOfWeek: 1, active: true, from: "12:00:00.000", till: "23:00:00.000" },
            { dayOfWeek: 2, active: true, from: "12:00:00.000", till: "23:00:00.000" },
            { dayOfWeek: 3, active: true, from: "12:00:00.000", till: "23:00:00.000" },
            { dayOfWeek: 4, active: true, from: "12:00:00.000", till: "23:00:00.000" },
            { dayOfWeek: 5, active: true, from: "12:00:00.000", till: "24:00:00.000" },
            { dayOfWeek: 6, active: true, from: "12:00:00.000", till: "24:00:00.000" }
        ],
        opened: false,
        customize: {
            primaryColor: "#319795",
            menuFavorites: true,
            menuFavoritesCounter: true
        }
    }
];

// Mock dish data
export const mockDishes: Dish[] = [
    {
        _id: { $oid: "687e5d0fedcfa52581f3c103" },
        name: "Курча на вогні L з соусом Huli",
        description: "Ароматне соковите курча, покрите солодкою скоринкою. Маринад-секретний, фірмовий рецепт від шеф кухаря, який передавався з покоління до покоління. Подається з лавашем, битими огірками та фірмовим соусом.",
        price: 28400,
        priceFormatted: 284,
        likes: 1080,
        available: true,
        sectionId: "66a204b59677921eeb74dd70",
        media: [{
            url: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
            thumbnail: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=300",
            medium: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=500",
            big: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
            webp: {
                url: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
                thumbnail: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=300",
                medium: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=500",
                big: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        }],
        weight: "600",
        weightType: "g",
        tags: ["HULI МЕНЮ"]
    },
    {
        _id: { $oid: "687e5d0fedcfa52581f3c104" },
        name: "Huli Шаурма класична",
        description: "Традиційна шаурма з соковитим м'ясом, свіжими овочами та фірмовим соусом в теплому лаваші.",
        price: 15500,
        priceFormatted: 155,
        likes: 850,
        available: true,
        sectionId: "66583503c03c3c30c59230ab",
        media: [{
            url: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=800",
            thumbnail: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=300",
            medium: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=500",
            big: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=800",
            webp: {
                url: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=800",
                thumbnail: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=300",
                medium: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=500",
                big: "https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        }],
        weight: "350",
        weightType: "g",
        tags: ["HULI ШАУРМА"]
    },
    {
        _id: { $oid: "687e5d0fedcfa52581f3c105" },
        name: "Huli Set Supreme",
        description: "Комбо сет з найпопулярнішими стравами: курча на вогні, шаурма, картопля фрі та напій на вибір.",
        price: 42000,
        priceFormatted: 420,
        likes: 654,
        available: true,
        sectionId: "673a012508d5a54fd7e11aa8",
        media: [{
            url: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
            thumbnail: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300",
            medium: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500",
            big: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
            webp: {
                url: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
                thumbnail: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=300",
                medium: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500",
                big: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        }],
        weight: "1200",
        weightType: "g",
        tags: ["HULI SET"]
    }
];

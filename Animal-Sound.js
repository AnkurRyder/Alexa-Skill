exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`);
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to this Alexa Skill, please ask how animal sound's.", false),
                        {}
                    )
                );
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`);

                switch (event.request.intent.name) {
                    case "AnimalSoundIntent":
                        var animal = event.request.intent.slots.animal.value.trim();
                        var eDate = animalSounds[animal.toLowerCase()];
                        var aData = animalData[animal.toLowerCase()];
                        var response = '';
                        if (eDate) {
                            response = `The sound of ${animal} is ${eDate} and ${aData}.`
                        }
                        else {
                            response = `Sorry, I couldn't find the sound of that ${animal}.`
                        }
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(response, false),
                                {}
                            )
                        );
                        break;
                    
                    case "AMAZON.HelpIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`This skill can tell you Animals Sound like What does dog say`, false),
                                {}
                            )
                        );
                        break;

                    case "AMAZON.CancelIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Okay cancelling session.`, true),
                                {}
                            )
                        );
                        break;
                    
                    case "AMAZON.StopIntent":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Okay stopping session.`, true),
                                {}
                            )
                        );
                        break;

                    default:
                        throw "Invalid intent";
                }

                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`);
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);

        }

    } catch (error) { context.fail(`Exception: ${error}`) }

};

// Helpers
var buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };

};

var generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };

};

var animalSounds = {
    "chicken": "Cluck-cluck",
    "donkey": "Eeh-aah",
    "mouse": "Squeak",
    "cat": "Meow",
    "horse": "Neigh",
    "frog": "Ribbit",
    "snake": "Hiss",
    "pig": "Oink-oink",
    "sheep": "Baa-baa",
    "duck": "Quack",
    "bird": "Tweet-tweet",
    "monkey": "oo oo ee ee",
    "dog": "Woof-woof",
    "cow": "mooooo",
    "crocodile": "Snap",
    "mice": "Eek! Eek! Eek!",
    "hen": "Cluck-cluck",
    "whale": "Sing-sing",
    "zebra": "bray-bray",
    "walruse": "groan-groan",
    "vulture": "scream-scream",
    "turkey": "gobble-gobble",
    "tokay geckos": "croak-croak",
    "tarantulas": "hiss-hiss",
    "tapir": "squeak-squeak",
    "swarn": "hiss-hiss",
    "goat": "baa-baa",
    "lamb": "baa-baa",
    "seal": "bark-bark",
    "rook": "caw-caw",
    "rhinoceros": "bellow-bellow",
    "raven": "caw-caw",
    "rabbit": "squeak-squeak",
    "hare": "squeak-squeak",
    "pigeon": "coo-coo",
    "hog": "grunt-grunt",
    "peacock": "scream-scream",
    "owl": "hoot-hoot",
    "mosquito": "buzzzzz",
    "grasshopper": "chirp-chrip",
    "giraffe": "bleat-bleat",
    "toad": "croak",
    "deer": "buck-buck",
    "dolphin": "click-click",
    "elephant": "trumpet",
    "crow": "caw-caw",
    "bee": "buzzzz",
    "bat": "screech",
    "bear": "roar",
    "lion": "roar",
    "tiger": "roar",
    "jaguar": "roar",
    "leopard": "roar"
}

var animalData = {
    "chicken": "The chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.",
    "donkey": "The donkey or ass is a domesticated member of the horse family and it  has been used as a working animal for at least 5000 years.",
    "mouse": "A mouse, plural mice, is a small rodent characteristically having a pointed snout, small rounded ears, a body-length scaly tail and a high breeding rate.",
    "cat": "The cat (Felis catus) is a small carnivorous mammal. It is the only domesticated species in the family Felidae and often referred to as the domestic cat to distinguish it from wild members of the family.",
    "horse": "The horse is one of two extant subspecies of Equus ferus. It is an odd-toed ungulate mammal belonging to the taxonomic family Equidae.",
    "frog": "A frog is any member of a diverse and largely carnivorous group of short-bodied, tailless amphibians composing the order Anura. ",
    "snake": "Snakes are elongated, legless, carnivorous reptiles of the suborder Serpentes.",
    "pig": "A pig is any of the animals in the genus Sus, within the even-toed ungulate family Suidae. Pigs include the domestic pig and its ancestor, the common Eurasian wild boar, along with other species.",
    "sheep": "Domestic sheep are quadrupedal, ruminant mammals typically kept as livestock. Like most ruminants, sheep are members of the order Artiodactyla, the even-toed ungulates. Although the name sheep applies to many species in the genus Ovis, in everyday usage it almost always refers to Ovis aries. ",
    "duck": "Duck is the common name for a large number of species in the waterfowl family Anatidae which also includes swans and geese. ",
    "bird": "Birds, also known as Aves, are a group of endothermic vertebrates, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton. ",
    "monkey": "Monkey is a common name that may refer to groups or species of mammals, in part, the simians of infraorder Simiiformes.",
    "dog": "The domestic dog is a member of the genus Canis, which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore.",
    "cow": "Cattle—colloquially cows—are the most common type of large domesticated ungulates. They are a prominent modern member of the subfamily Bovinae, are the most widespread species of the genus Bos, and are most commonly classified collectively as Bos taurus.",
    "crocodile": "Crocodiles or true crocodiles are large semiaquatic reptiles that live throughout the tropics in Africa, Asia, the Americas and Australia. ",
    "mice": "A mouse, plural mice, is a small rodent characteristically having a pointed snout, small rounded ears, a body-length scaly tail and a high breeding rate.",
    "hen": "Hen commonly refers to a female animal: a chicken, other gallinaceous bird, any type of bird in general, or a lobster.",
    "whale": "Whales are a widely distributed and diverse group of fully aquatic placental marine mammals. They are an informal grouping within the infraorder Cetacea, usually excluding dolphins and porpoises.",
    "zebra": "Zebras are several species of African equids united by their distinctive black-and-white striped coats. Their stripes come in different patterns, unique to each individual.",
    "walruse": "The walrus is a large flippered marine mammal with a discontinuous distribution about the North Pole in the Arctic Ocean and subarctic seas of the Northern Hemisphere.",
    "vulture": "A vulture is a scavenging bird of prey. The two types of vultures are the New World vultures, including the Californian and Andean condors, and the Old World vultures, including the birds that are seen scavenging on carcasses of dead animals on African plains. ",
    "turkey": "The turkey is a large bird in the genus Meleagris, which is native to the Americas. ",
    "tokay geckos": "The tokay gecko is a nocturnal arboreal gecko in the genus Gekko, the true geckos. It is native to Asia and some Pacific Islands.",
    "tarantulas": "Tarantulas comprise a group of large and often hairy arachnids belonging to the Theraphosidae family of spiders, of which about 900 species have been identified.",
    "tapir": "A tapir is a large, herbivorous mammal, similar in shape to a pig, with a short, prehensile nose trunk. ",
    "swarn": "The swan is a large aquatic bird closely related to geese and ducks.",
    "goat": "The domestic goat or simply goat is a subspecies of C. aegagrus domesticated from the wild goat of Southwest Asia and Eastern Europe. ",
    "lamb": "Lamb, hogget and mutton are the meat of domestic sheep at different ages. In general a sheep in its first year is called a lamb, and its meat is also called lamb.",
    "seal": "Pinnipeds, commonly known as seals, are a widely distributed and diverse clade of carnivorous, fin-footed, semiaquatic marine mammals.",
    "rook": " Corvus frugilegus. Rook, (Corvus frugilegus), the most abundant Eurasian bird of the crow family",
    "rhinoceros": "A rhinoceros, commonly abbreviated to rhino, is one of any five extant species of odd-toed ungulates in the family Rhinocerotidae, as well as any of the numerous extinct species. ",
    "raven": "The Raven is a member of the same family as the crow and the magpie, known as the Corvids family. ",
    "rabbit": "Rabbits are small mammals in the family Leporidae of the order Lagomorpha. Oryctolagus cuniculus includes the European rabbit species and its descendants, the world's 305 breeds of domestic rabbit. ",
    "hare": "Hare are small mammals in the family Leporidae of the order Lagomorpha. Oryctolagus cuniculus includes the European rabbit species and its descendants, the world's 305 breeds of domestic rabbit. ",
    "pigeon": "Pigeons and doves constitute the animal family Columbidae and the order Columbiformes, which includes about 42 genera and 310 species. ",
    "hog": "Hog domesticated mammal, of the swine family, extensively raised in almost every part of the world as a food animal. Hogs belong to the order of even-toed hoofed animals.",
    "peacock": "Peafowl is a common name for three species of birds in the genera Pavo and Afropavo of the Phasianidae family, the pheasants and their allies.",
    "owl": "Owls are birds from the order Strigiformes, which includes about 200 species of mostly solitary and nocturnal birds of prey typified by an upright stance, a large, broad head, binocular vision, binaural hearing, sharp talons, and feathers adapted for silent flight. ",
    "mosquito": "Mosquitoes are a group of about 3500 species of small insects that are a type of fly.",
    "grasshopper": "Grasshoppers are a group of insects belonging to the suborder Caelifera. ",
    "giraffe": "The giraffe is a genus of African even-toed ungulate mammals, the tallest living terrestrial animals and the largest ruminants. ",
    "toad": "The common toad is also a nocturnal animal, spending the daylight hours resting and hunting by night.",
    "deer": "Deer are the hoofed ruminant mammals forming the family Cervidae. ",
    "dolphin": "Dolphin is a common name of aquatic mammals within the order Cetacea, arbitrarily excluding whales and porpoises. ",
    "elephant": "Elephants are large mammals of the family Elephantidae in the order Proboscidea. Three species are currently recognised: the African bush elephant, the African forest elephant, and the Asian elephant.",
    "crow": "A crow is a bird of the genus Corvus, or more broadly a synonym for all of Corvus.",
    "bee": "The honey bee is a herbivorous animal and therefore lives purely on the nutrients from plants. Honey bees prefer to ingest the sweeter plant produce such as nectar, pollen, fruits and even honey. ",
    "bat": "Bats are mammals of the order Chiroptera; with their forelimbs adapted as wings, they are the only mammals naturally capable of true and sustained flight.",
    "bear": "Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans.",
    "lion": "The lion is a species in the family Felidae; it is a muscular, deep-chested cat with a short, rounded head, a reduced neck and round ears, and a hairy tuft at the end of its tail.",
    "tiger": "The tiger is the largest species among the Felidae and classified in the genus Panthera. It is most recognizable for its dark vertical stripes on reddish-orange fur with a lighter underside.",
    "jaguar": "The jaguar is a wild cat species and the only extant member of the genus Panthera native to the Americas.",
    "leopard": "The leopard is one of the five extant species in the genus Panthera, a member of the Felidae. The leopard occurs in a wide range in sub-Saharan Africa and parts of Asia. "
}
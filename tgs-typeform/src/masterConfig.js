export const questionsSchema = [
  {
    id: "1",
    type: "text",
    title: "What is your name?",
    placeholder: "John Doe",
    required: true,
    validation: (value) => {
      if (value.length < 3) {
        return "Your name must be at least 3 characters long";
      }
    },
    initValue: "",
  },
  {
    id: "2",
    type: "text",
    title: "What is your email?",
    placeholder: "vvinayppokra@gmail.com",
    required: true,
    validation: (value) => {
      if (value.length < 3) {
        return "Your email must be at least 3 characters long";
      }
    },
    initValue: "",
  },
  {
    id: "3",
    type: "rating",
    title: "How likely are you to recommend this product to a friend?",
    required: true,
    options: [0, 1, 2, 3, 4, 5],
    initValue: 2,
  },
];

export const questionsSchema = [
  {
    id: "1",
    type: "text",
    title: "What is your name?",
    placeholder: "John Doe",
    required: true,
    initValue: "",
    label: "Name",
  },
  {
    id: "3",
    type: "rating",
    title: "How likely are you to recommend this product to a friend?",
    required: true,
    options: [0, 1, 2, 3, 4, 5],
    initValue: 2,
  },
  {
    type: "multiValue",
    fields: {
      email: {
        id: "2",
        type: "email",
        title: "What is your email?",
        placeholder: "vvinayppokra@gmail.com",
        required: true,
        regex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/,
        initValue: "",
        label: "Email",
      },
      Mobile: {
        id: "234",
        type: "Mobile",
        title: "What is your mobile number?",
        placeholder: "+91-9876543210",
        required: true,
        regex: /^[789]\d{9}$/,
        initValue: "",
        label: "Mobile",
      },
    },
  },
];

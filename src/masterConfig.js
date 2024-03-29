export const questionsSchema = [
  {
    id: "name",
    type: "text",
    title: "What is your name?",
    placeholder: "John Doe",
    required: true,
    initValue: "",
    label: "Name",
    regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
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
        errorMsg: "Please enter a valid email address",
      },
      Mobile: {
        id: "mobile",
        type: "Mobile",
        title: "What is your mobile number?",
        placeholder: "+91-9876543210",
        required: true,
        regex: /^(\+|00)[1-9][0-9 \-\(\)\.]{11,13}$/,
        initValue: "",
        label: "Mobile",
        errorMsg: "Please enter a valid mobile number",
      },
    },
  },
];

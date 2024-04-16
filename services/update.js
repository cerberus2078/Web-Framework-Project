// // update the user - without mongodb

// app.patch('/api/users/:userid', (req,res) => {
//     const idToUpdate = Number(req.params.id);
//     const newFirstName = req.body.firstName;
//     const newLastName = req.body.lastName;
//     const newEmail = req.body.email;
//     const newPhoneNumber = req.body.phoneNumber;

//     users.forEach(user => {
//     if (user.id === idToUpdate)
//     {
//         user.firstName = newFirstName;
//         user.lastName = newLastName;
//         user.email = newEmail;
//         user.phoneNumber = newPhoneNumber;
//         res.status(200).json(user);
//     }
//     });
// });
const tempMail = (user, resetLink) => {
  return `<h1>Hello ${user}</h1>
    <p>please click this link to change your password</p>
    <a href="${resetLink}">Click here</a>`;
};

module.exports = tempMail;

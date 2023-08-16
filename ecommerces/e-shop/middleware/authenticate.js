export const verify = (request, response, next) => {
  // if (request.session.user.isLoggedIn) {
  if (request.session.user)
    next();
  else
    return response.redirect("/");
}

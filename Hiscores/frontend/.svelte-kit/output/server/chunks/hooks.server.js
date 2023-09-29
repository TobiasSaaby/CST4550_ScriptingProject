const handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  if (session) {
    event.locals.user = session;
  }
  return await resolve(event);
};
export {
  handle
};

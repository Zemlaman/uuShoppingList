function checkOwner(req, res, next) {
  const userName = req.user.name;
  const shoppingListId = req.params.id;

  const shoppingList = dao.get(shoppingListId);

  if (shoppingList && shoppingList.owner === userName) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Permission denied. User is not the owner." });
  }
}

function checkMember(req, res, next) {
  const userName = req.user.name;
  const shoppingListId = req.params.id;

  const shoppingList = dao.get(shoppingListId);

  if (shoppingList && shoppingList.members.includes(userName)) {
    next();
  } else {
    res.status(403).json({ error: "Permission denied. User is not a member." });
  }
}

module.exports = { checkOwner, checkMember };

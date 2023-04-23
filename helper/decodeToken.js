const decodeToken = async (req, res, next) => {
  const token = getTokenFromRequest(req)

  if (!token) {
    res.json({
      err: 'token not found'
    })
    return
  }

  try {
    const decodedToken = await jwt.verify(token, SECRET_KEY)
    req.decodedToken = decodedToken
    next()  

  } catch (e) {
    console.log(e.name)
    res.send(e.name)
    return
  }
}
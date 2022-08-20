const isAdmin = (req, res, next) => {
  try {
    let { auth } = req.query
    if (process.env.SECRET_KEY === auth) next()
    else res.status(401).send("Unauthorized")
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong",
    })
  }
}
export default isAdmin
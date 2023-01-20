export async function reIssueAccessToken({refreshToken,}: {refreshToken: string;}) {
    const { decoded } = validateJwt(refreshToken);
  
    if (!decoded || !get(decoded, "session")) return false;
  
    const session = await sessionModel.findById(get(decoded, "session"));
  
    if (!session || !session.valid) return false;
  
    const user = await findUser({ _id: session.user });
  
    if (!user) return false;
  
    const accessToken = signJwt(
      { ...user, session: session._id },
    //   "accessTokenPrivateKey",
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
  
    return accessToken;
  }
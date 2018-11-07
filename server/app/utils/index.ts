const utils = {
  normalizeOutput (finish: boolean, success: boolean, data: any) {
    return { finish, success, data }
  }
}

export default utils;

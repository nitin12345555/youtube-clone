export default axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://youtube-clone-eosin-five.vercel.app",
});

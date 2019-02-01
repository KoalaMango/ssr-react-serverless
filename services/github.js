import GitHub from "github-api";
import slugify from "slugify";

export const handleSubmission = async (pattern) => {
  const barnchName = `feature/${slugify(pattern.name.toLowerCase(), '_')}`;

  // basic auth
  const gh = new GitHub({
    username: 'StrikoMirko',
    password: 'tetak21',
    // token: '6b1d6c856f12fc8f1e03cc84276e26d29f9e5f54'
  });
  const repo = gh.getRepo('KoalaMango', 'ssr-react-serverless');
  const allBranches = await repo.listBranches();
  console.log(allBranches.data);
  const branchExists = allBranches.data.filter(b => b.name === barnchName).length !== 0;
  if (!branchExists) {
    const branch = await repo.createBranch('master', barnchName);
  }
  // const branch = repo.createBranch('master', barnchName);
};

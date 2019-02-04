import GitHub from "github-api";
import slugify from "slugify";
import shell from 'shelljs';

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
  const branchExists = allBranches.data.filter(b => b.name === barnchName).length !== 0;
  if (!branchExists) {
    await shell.exec(`./services/github.sh ${barnchName}`)
    const pull = {
      title: pattern.name,
      body: `Pull request for pattern ${barnchName}`,
      base: 'master',
      head: barnchName,
    };
    try {
      const pr = await repo.createPullRequest(pull);
      return pr.html_url;
    } catch (e) {
      throw new Error(e);
    }
  }
};

import GitHub from "github-api";
import slugify from "slugify";
import shell from 'shelljs';

export const handleSubmission = async (pattern) => {
  const barnchName = `feature/${slugify(pattern.name.toLowerCase(), '_')}`;

  // basic auth
  const gh = new GitHub({
    token: '6867ae0b14e7c2d7dcb1fd4a554f7003adda1abf'
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
      return pr.data.html_url;
    } catch (e) {
      throw new Error(e);
    }
  }
};

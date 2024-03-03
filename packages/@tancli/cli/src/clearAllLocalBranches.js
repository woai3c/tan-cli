const { exec } = require('child_process')

module.exports = function clearAllLocalBranches() {
    // 获取当前分支的名字
    exec('git branch --show-current', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error getting current branch: ${err}`)
            return
        }

        const currentBranch = stdout.trim()

        // 获取所有本地分支的名字，排除当前分支
        exec('git branch', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error getting branches: ${err}`)
                return
            }

            // 将每个分支名转为数组元素，排除当前分支
            const branches = stdout.split('\n').filter((branch) => branch.trim() !== currentBranch)

            // 遍历每个分支
            branches.forEach((branch) => {
                // 删除分支
                exec(`git branch -D ${branch.trim()}`, (err, stdout, stderr) => {
                    if (err) {
                        return
                    }

                    console.log(`Deleted branch ${branch}`)
                })
            })
        })
    })
}

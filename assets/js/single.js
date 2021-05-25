var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);
            });
        } else {
            console.log(response);
            alert("There was a problem with your request!")
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create link element to take users to the issue on github
        var issueEl = document.createElement("a");
        if (issueEl) {
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("target", "_blank");
        }

        // create span to hold issue title
        var titleEl = document.createElement("span");
        if (titleEl) {
            titleEl.textContent = issues[i].title;
        }

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if is issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "Pull request";
        } else {
            typeEl.textContent = "Issue";
        }

        // append to container
        issueEl.appendChild(typeEl);

        // append to the dom
        issueContainerEl.appendChild(issueEl);
    };
};
getRepoIssues("jvesterfelt/git-it-done");
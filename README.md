# Geolocation Search [![Badge](https://img.shields.io/badge/built%20with-wedeploy-00d46a.svg?style=flat)](http://wedeploy.com)

A demo of [WeDeploy Hosting](https://wedeploy.com/docs/hosting/) and [WeDeploy Data](https://wedeploy.com/docs/data/).

## Instructions

1. Install the [WeDeploy CLI](https://wedeploy.com/docs/intro/using-the-command-line/).
2. Go to the [WeDeploy Console](https://console.wedeploy.com) and create a new project.
3. Clone this repository and open it in a text editor.
4. Search for all occurrences of `geodemo.wedeploy.io` and replace with `yourproject.wedeploy.io`.
5. Open the project with your command line and run `we deploy -p yourproject`.

## Using Sample Data

After deploying your project, you can save our sample dataset so that your app has actual data to work with.

1. In your terminal, change directories to the root of this repo.
2. Paste the code below into your terminal
3. Replace the ID and token with that of your project
4. Run script (it may take a few seconds to finish)

  ```
  curl -X POST \
    --url https://db-{yourProjectId}.wedeploy.io/places \
    --header 'content-type: application/json' \
    --header 'authorization: Bearer {yourProjectToken}' \
    --data @sample-data.json
  ```

## License

[BSD-3-Clause](./LICENSE.md), © Liferay, Inc.

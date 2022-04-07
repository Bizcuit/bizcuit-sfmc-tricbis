# Salesforce Marketing Cloud Custom Content Block for Interaction Studio Triggered Campaings

## Setup
- Create a new Cloud Page in your MC Business Unit. Use [index.html](dist/index.html) as a content. 
  - MC Main Menu -> Web Studio -> Cloud Pages
  - Create a new Collection or open an existing one
  - Click "Add Content" -> Landing Page. Give it a name, select "Blank" as a layout
  - Select "Code View" tab, delete all default HTML and paste the [content of the compiled file](https://raw.githubusercontent.com/Bizcuit/bizcuit-sfmc-tricbis/master/dist/index.html)
  - Click "Save"
  - Click "Schedule/Publish" and publish the page immediately
  - Save the URL of the Cloud Page
- Create a new [Installed Package](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/install-packages.html) in Marketing Cloud
- Add a [new Custom Content Block](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/create-content-block.html) based on the Cloud Page you've just created
  - Use the URL of the Cloud Page as an Endpoint URL of the Content Block

## Development

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

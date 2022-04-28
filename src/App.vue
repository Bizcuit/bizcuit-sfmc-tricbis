<template>
    <div id="app">
        <div class="field">
            <label class="label is-small">Headline</label>
            <div class="control">
                <input
                    class="input is-small"
                    type="text"
                    placeholder="e.g. Product Recommendations"
                    v-model="content.headline"
                />
            </div>
        </div>

        <div class="field">
            <label class="label is-small">Field Name:</label>
            <div class="control">
                <div class="select is-small">
                    <select v-model="content.field">
                        <option value="Trigger_Catalog_Items">
                            Trigger Catalog Items
                        </option>
                        <option value="Recommendations">Recommendations</option>
                        <option value="Additional_Recommendations">
                            Additional Recommendations
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns is-mobile">
            <div class="column">
                <div class="field">
                    <label class="label is-small">Block Width:</label>
                    <div class="control">
                        <div class="select is-small">
                            <select v-model="content.blockWidth">
                                <option value="600">600px</option>
                                <option value="800">800px</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label is-small">Currency Locale</label>
                    <div class="control">
                        <input
                            class="input is-small"
                            type="text"
                            placeholder="e.g. us-EN"
                            v-model="content.currencyLocale"
                        />
                    </div>
                </div>                
            </div>
        </div>

        <div class="columns is-mobile">
            <div class="column">
                <div class="field">
                    <label class="label is-small">Items per row:</label>
                    <div class="control">
                        <div class="select is-small">
                            <select v-model="content.numberOfItemsPerRow">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label is-small">Number of rows:</label>
                    <div class="control">
                        <div class="select is-small">
                            <select v-model="content.numberOfRows">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ContentBlockSDK from "blocksdk";

export default {
    name: "App",
    components: {},

    data: function () {
        return {
            system: {
                sdk: new ContentBlockSDK(),
            },
            content: {
                field: "Recommendations",
                currencyLocale: "en-US",
                headline: "",
                numberOfItemsPerRow: 3,
                numberOfRows: 1,
                blockWidth: 600,
            },
        };
    },
    methods: {
        init() {
            this.system.sdk.setBlockEditorWidth("400px");
            this.system.sdk.getData((data) => {
                if (data?.field) {
                    this.content = data;
                }
            });
        },

        getHtmlContent() {
            const width = Math.floor(
                this.content.blockWidth / this.content.numberOfItemsPerRow
            );
            const maxNumberOfItems =
                this.content.numberOfRows * this.content.numberOfItemsPerRow;
            const ampOpen = "%".toLowerCase() + "%".toLowerCase() + "[".toLowerCase();
            const ampClose =
                "]".toLowerCase() + "%".toLowerCase() + "%".toLowerCase();

            return `
            ${ampOpen}
                SET @Catalog_Data = AttributeValue("${this.content.field}")
            ${ampClose}
            
            <div style="max-height: 100%; max-width: ${this.content.blockWidth}px; position: relative; overflow: hidden; margin: 20px auto; text-align: center;">
                <div style="display: block; text-align: center; font-size: 20px; font-weight: bold; color: #555555; line-height: 30px; font-family: arial;">
                    ${this.content.headline}
                </div>
        
                <div style="display: table; width: 100%; max-height: 100%;">
                    {{.datasource JSONVar type=variable maxRows=${maxNumberOfItems}}}
                    {{.data}}
                        { "target" : "@Catalog_Data" }
                    {{/data}}
            
                    <span style="display: inline-block; margin-top: 10px;">
                        <a href="{{url}}" style="display: block; width: ${width}px; overflow: hidden;">
                            <img src="{{imageUrl}}" style="border: 0; width: 90%; margin: 10px;">
                        </a>
                        <div style="padding: 0px; margin: 0px; width: ${width}px; overflow: hidden;">
                            <h3 style="padding: 0px; margin: 10px; font-size: 16px; line-height: 20px; height: 40px; overflow: hidden;">
                                {{name}}
                            </h3>
                            <p style="padding: 0px; margin: 10px; font-size: 14px;">
                                Price: {{=FormatCurrency(price, "${this.content.currencyLocale}")}}
                            </p>
                        </div>
                    </span>
                    
                    {{/datasource}}
                </div>
            </div>
            `;
        },

        getPreviewContent() {
            const width = Math.floor(
                this.content.blockWidth / this.content.numberOfItemsPerRow
            );

            const maxNumberOfItems =
                this.content.numberOfRows * this.content.numberOfItemsPerRow;

            let tiles = "";

            for (let i = 0; i < maxNumberOfItems; i++) {
                tiles += `
                <div style="margin-top: 10px; width: ${width}px; overflow: hidden; float: left;">
                    <div style="margin: 10px; height: ${width}px; background: #EEEEEE;"></div>
                </div>`;
            }

            return `
                <div style="margin: 10px auto; width: ${this.content.blockWidth}px">
                    <div style="padding: 10px; background: #EEEEEE; border: dashed 1px #CCCCCC; color: #AAAAAA; text-align: left; font-family: arial; font-size: 14px; line-height: 24px;">
                        <strong>Interaction Studio Content:</strong>  ${this.content.field}
                    </div>
                    <div style="padding: 10px 0px; display: block; text-align: center; font-size: 20px; font-weight: bold; color: #555555; line-height: 30px; font-family: arial;">
                        ${this.content.headline}
                    </div>
                    <div>${tiles}</div>
                </div>
            `;
        },

        setContent() {
            this.system.sdk.setData(this.content);
            this.system.sdk.setContent(this.getHtmlContent());
            this.system.sdk.setSuperContent(this.getPreviewContent());

            console.log(this.getHtmlContent());
        },
    },
    computed: {
        blockContent() {
            return JSON.stringify(this.content);
        },
    },
    watch: {
        blockContent() {
            this.setContent();
        },
    },
    created() {
        this.init();
    },
};
</script>

<style>
#app {
    margin: 0px auto;
    padding: 20px;
    max-width: 500px;
}

div.select { width: 100%; }
select { width: 100%; }
</style>

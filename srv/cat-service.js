const cds = require('@sap/cds');


module.exports = cds.service.impl(async function () {
    let { Books } = this.entities;

    this.after('READ', Books, async (req) => {
        const BPA = await cds.connect.to("vobBpaTrigger");
        let finalurlapp = 'test';
        let vobid = 'test1';
        let sequentialvobid = 'test1'

        // Define the body of the request to create a new workflow instance
        const body = {
            "definitionId": `us10.2b3bc598trial.vobprocesflowdev.vOB_Process`,
            "context": {
                "users": `johnson.rozario@peolsolutions.com`,
                "currlevel": "R1",
                "baseurl": `${finalurlapp}`,
                "vobid": `${vobid}`,
                "sequentialvobid": `${sequentialvobid}`,
                "initiatedrequestor": `ww`,
                "inboxlink": `222`
            }
        };

        // Post the request to create a workflow instance
        const response = await BPA.post('/workflow/rest/v1/workflow-instances', body);
        console.log("BPA response:", JSON.stringify(response));
    })
})
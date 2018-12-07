const ai_chi = require('./artinstitutechi/ai_chi')
const request = require("request")
const Agent = require('socks5-https-client/lib/Agent')
const fs = require('fs')

let page = 1

let chi_cb = (data_arr) => {
    data_arr.forEach(ele => {
        let url = `${ele.iiifid}/full/!4000,4000/0/default.jpg`
        let title = ele.title.replace(/[\\\/:*?"<>|]+/g, "_")
        request({
            url: url,
            agentClass: Agent
        }).pipe(fs.createWriteStream(`${title}.jpg`))
    })
    if (data_arr.length > 0) {
        chi(page+1)
    }
}

let chi = (page) => {

    ai_chi(page, chi_cb)

}

chi()
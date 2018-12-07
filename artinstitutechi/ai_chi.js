const cheerio = require('cheerio')
const request = require("request")
const Agent = require('socks5-https-client/lib/Agent')

const base_url = 'https://www.artic.edu/collection'

let laod_more = (page, callback) => {

    let tag_base = 'li.m-listing a'  
    let tag_img = 'span.m-listing__img img' 
    let tag_title = 'span.m-listing__meta strong.title'
    let tag_author = 'span.m-listing__meta span.subtitle'

    request({
        url: `${base_url}/more?page=${page}`,
        headers: {'Content-type': 'application/json'},
        strictSSL: true,
        agentClass: Agent,
    }, function(err, res) {
        let data_arr = []
        if (!err) {
            let html = JSON.parse(res.body).html
            let $ = cheerio.load(html)     
            $(tag_base).each((idx, ele)=>{
                let href = ele.attribs.href
                let iiifid = $(tag_img, ele).attr('data-iiifid')
                let desc = $(tag_img, ele).attr('alt')
                let title = $(tag_title, ele).text()
                let author = $(tag_author, ele).text()

                data_arr.push({
                    'href': href,
                    'iiifid': iiifid,
                    'desc': desc,
                    'title': title,
                    'author': author
                })
                // console.log(`
                // href: ${href}, 
                // iiifid: ${iiifid}, 
                // desc: ${desc}, 
                // title: ${title}, 
                // author: ${author}
                // `)
            })
            callback(data_arr)
        } else {
            console.log(err);
        }
    });
}

module.exports = laod_more

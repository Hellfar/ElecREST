'use strict';

function addData(  ) {
  document.querySelector("#data").appendChilds(createElements(
    {
      'tag': 'span',
      'class':'pair',
      'child': jsonParams(
        {
          "key": null,
          "value": null,
          "remove": null
        },
        {
          "remove": {
            "tag": "button",
            "onclick": "javascript:this.parent('div').removeChild(this.parent('.pair'));",
            "child": "-",
          }
        }
      ).concat([
        {
          'tag': 'br'
        }
      ])
    }
  ));
}
function addHeader( target ) {
  document.querySelector("#"+ target +" #header").appendChilds(createElements(
    {
      'tag': 'span',
      'class':'param',
      'child': jsonParams(
        {
          "header": null,
          "parameters": null,
          "remove": null,
        },
        {
          "header": (target == 'request') ? [
            "Accept-Language",
            "Content-Type",
            "Authorization",
          ] : [
          ],
          "remove": {
            "tag": "button",
            "onclick": "javascript:this.parent('div').removeChild(this.parent('.param'));",
            "child": "-",
          }
        }
      ).concat([
        {
          'tag': 'br'
        },
      ])
    }
  ));
}

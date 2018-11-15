chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.")
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
        new chrome.declarativeContent.PageStateMatcher({ })
      ],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}])
	})

})

var latest:number = 0
var senders: Senders = {}
chrome.runtime.onMessage.addListener(function (request, sender, reply) {
  console.log('GOT MESSSAGE', request)
  if (request.message) {
    var reqNumber = ++latest
    senders[reqNumber] = sender.tab.id
    chrome.windows.create({
      url: `/web/popup.html#sign/${request.message}/${reqNumber}`,
      type: 'popup'
    })
  }
  
  if (request.replyTo) {
    console.log('replying to', senders)
    chrome.tabs.sendMessage(senders[request.replyTo], {signature: request.signature})
  }

  return true
})

interface Senders {
  [key:number]: number
}

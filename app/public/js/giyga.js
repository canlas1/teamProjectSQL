
 
        // Create and Publish User's Action
 
        // This method is associated with the "btnPublishAction" click
        function showShareUI(operationMode) {
 
            // Constructing a UserAction Object
            var act = new gigya.socialize.UserAction();
 
            // Setting the title and description
 
            // (will be presented in the preview on the Share UI)
            act.setTitle("Gigya - Make your site social.");
            act.setSubtitle("An overview video");
            act.setDescription("Gigya's technology makes websites social, integrating online businesses with"
                + " the top social networks using Facebook Connect, Twitter for Websites, "
                + "LinkedIn, Foursquare and more.");
 
            // Setting a link back to the publishing source
            act.setLinkBack("http://info.gigya.com/GigyaVideoOverviewForm.html");
 
            // Adding Action Link
            act.addActionLink("Gigya site", "http://www.gigya.com");
 
            // Adding an image (will be presented in the preview on the Share UI)
            var image = {
                src: 'http://info.gigya.com/rs/gigya/images/gigyaN-logo.gif',
                href: 'http://info.gigya.com/GigyaVideoOverviewForm.html',
                type: 'image'
            };
            act.addMediaItem(image);
 
            // Parameters for the showShareUI method, including the UserAction object
            var params =
            {
                userAction: act  // The UserAction object enfolding the newsfeed data. 
                ,operationMode: operationMode// Opens the Share add-on either in Simple or Multiselect mode according to the user connection status.
                ,snapToElementID: "btnShare" // Snaps the Simple Share add-on to the share button
                ,onError: onError  // onError method will be summoned if an error occurs.
                ,onSendDone: onSendDone // onError method will be summoned after 
                                    // Gigya finishes the publishing process.
                ,context: operationMode        
                ,showMoreButton: true // Enable the "More" button and screen
                ,showEmailButton: true // Enable the "Email" button and screen
                ,emailBody: "This email is from: $sender$ <br/> Check this out: $URL$ <br/> $userMsg$ <userMsg> <br/> The title is: $title$ <br/> The description is: $description$"
                ,useHTML: true  // Use the HTML implementation of the add-on
            };
 
            // Show the "Share" dialog
            gigya.socialize.showShareUI(params);
        }
 
        // onError event handler
        function onError(event) {
            alert('An error has occurred' + ': ' + event.errorCode + '; ' + event.errorMessage);
        }
 
        // onSendDone event handler.
 
        // Displays in the status field, the list of providers to which the newsfeed has been
 
        // successfully published.
        function onSendDone(event)
        {
            document.getElementById('status').style.color = "green";
            switch(event.context)
            {
                case 'multiSelect':
                    document.getElementById('status').innerHTML = 'The newsfeed has been posted to: '  + event.providers;
                    break;
                case 'simpleShare':
                    document.getElementById('status').innerHTML = 'Clicked '  + event.providers;
                    break;
                default:
                    document.getElementById('status').innerHTML = 'Share onSendDone' ;
            }
        }
    </script>
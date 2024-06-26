/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const interceptors = require('./interceptors');
const util = require('./util'); // utility functions
const logic = require('./logic'); // this file encapsulates all "business" logic
const constants = require('./constants');
const moment = require('moment-timezone'); // will help us do all the dates math while considering the timezone


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
     
      let  sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      
        if (sessionAttributes['access_token']!==undefined){
        console.log('entro LaunchRequest'+sessionAttributes['access_token'])
          
      }else{
          console.log('entro LaunchRequest')
      }
      let intent='Entro LaunchRequest'
      if (sessionAttributes['access_token'] !== undefined){
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }

       console.log(' all ther ' + JSON.stringify(sessionAttributes['all_therapies']))
       let alexa_id= handlerInput.requestEnvelope.session.user.userId
        sessionAttributes['alexa_id']=alexa_id
        // check if the user has given permission for reminders to the skill from the alexa app
       
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient(),
       
        
        { permissions } = handlerInput.requestEnvelope.context.System.user 

        let substr=permissions["scopes"];
        substr=JSON.stringify(substr);
        let checksub=substr.indexOf("DENIED");
        let speakOutput
        if(permissions===undefined || checksub>=0) {
           const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
           
            speakOutput=requestAttributes.t('PERMISSION_ERROR_MSG');
          
            return handlerInput.responseBuilder
               .speak(speakOutput)
               .getResponse()
        }
        
        sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        let name = sessionAttributes['name'];
        let access_token = sessionAttributes['access_token'];
     
        if (!name || !access_token){
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            speakOutput=requestAttributes.t('SECURITY_CODE_FIRST_TIME_MSG');
            
            // utterance of SecurityCodeIntent
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
        }
        
        
        
     intent='esco LaunchRequest'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
    if (sessionAttributes['access_token']!==undefined){
        console.log('esco LaunchRequest'+sessionAttributes['access_token'])
          
      }else{
          console.log('esco LaunchRequest')
      } 
        return LoadTherapiesIntentHandler.handle(handlerInput);
         
    }
};


const SecurityCodeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SecurityCodeIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
     console.log('entro securitycode')
     
      let intent='entro securitycode'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
     
     
     
     
     
        // saving the otp spoken by the user to alexa
        let otp = handlerInput.requestEnvelope.request.intent.slots.otpnew.value;
       
        // via the logic.getAccessToken function getting 'name' and 'access_token' and save them in session
        let response;
        
        await logic.getAccessToken(otp).then(res =>{
            //console.log('res: '+    JSON.stringify(res))
                response = res;
            })
            .catch((error) => {
                console.log(error);
               
            });
            
        if(!response){
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speakOutput=requestAttributes.t('SECURITY_CODE_ERROR');
            
            // utterance of SecurityCodeIntent
               let intent='esco securitycode 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
        }
        else{
            
            let name = response.data.user.name?response.data.user.name:"utente";
            sessionAttributes['name'] = name;
            let access_token = response.data.access_token;
            sessionAttributes['access_token'] = access_token;
            //console.log('name '+ name + ' --- token: '+ access_token)
            // Post logs
            let typeOfAccess = 'Security Code Intent';
            let logResponse = await logic.postLogs(access_token, typeOfAccess);
        
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speakOutput=requestAttributes.t('LOAD_THERAPY_MSG',name);
             let alexa_id= handlerInput.requestEnvelope.session.user.userId
             let alexa_id_response=await logic.PostAlexaId(sessionAttributes['access_token'],alexa_id)
             sessionAttributes['notification_object_id']=alexa_id_response._id;
            
            
      let intent='esco securitycode 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            // utterance of LoadTherapiesIntent
     if (sessionAttributes['access_token']!==undefined){
        console.log('esco securitycode 1'+sessionAttributes['access_token'])
          
      }else{
          console.log('esco securitycode 1')
      }
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt()
                .getResponse();
        }
    }
};


const LoadTherapiesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LoadTherapiesIntent';
    },
    async handle(handlerInput) {
        
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let access_token = sessionAttributes['access_token'];
        let intent='entro LoadTherapiesIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
            if (sessionAttributes['access_token']!==undefined){
        console.log('entro LoadTherapiesIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro LoadTherapiesIntent')
      }
        
        
        let count_new_therapies = 0;
        let count_updated_therapies = 0;
        sessionAttributes['count_new_therapies'] = count_new_therapies;
        sessionAttributes['count_updated_therapies'] = count_updated_therapies;
      
      
      
       const timezone = "Europe/Rome";
       
        let startDate = logic.convertDateForDatabase(moment().tz(timezone).subtract(7, 'days')); // bisogna farlo iniziare prima del giorno stesso
        let endDate = logic.convertDateForDatabase(moment().tz(timezone).add(4, 'months')); 
        let therapiesChecked= await logic.getTherapies(access_token,startDate,endDate) 
        
        sessionAttributes['all_therapies'] = therapiesChecked.all_therapies;
        let checkMissed=true
        let old_therapies = therapiesChecked.old_therapies;
       
        //sessionAttributes['edit_therapies'] = therapiesChecked.edit_therapies;
        //save in updated_therapies therapies that have therapy.edit ='updated'
        sessionAttributes['updated_therapies'] = therapiesChecked.updated_therapies;
        //save in new_therapies that have therapy.edit='new' e therapy.state = true
        sessionAttributes['new_therapies'] = therapiesChecked.new_therapies;
        
             
        
        
        
        if (sessionAttributes['reminders']===undefined){
            sessionAttributes['reminders']=[];
        }
           for(let i=0;i< old_therapies.length;i++){
            checkMissed=true
            for(let j=0;j< sessionAttributes['reminders'].length;j++){
                
                if (sessionAttributes['reminders'][j].therapy_id===old_therapies[i]._id){
                    checkMissed=false
                    
                }
            }
            if (checkMissed===true){
              
                sessionAttributes['new_therapies'].push(old_therapies[i])
              
                
            }
        }
    sessionAttributes['new_therapies']=sessionAttributes['new_therapies'].filter(therapy=> (logic.convertDateFromDatabase(therapy.end_date)).isAfter((moment().tz( "Europe/Rome"))))    

        // Post logs
        let typeOfAccess = 'Load Therapies Intent';
        let logResponse = await logic.postLogs(access_token, typeOfAccess);
    if (sessionAttributes['new_therapies']===undefined){
        sessionAttributes['new_therapies']=[];  
    }
    if (sessionAttributes['updated_therapies']===undefined){
        sessionAttributes['updated_therapies']=[];  
    }
    
   
    
    if (JSON.stringify(sessionAttributes['new_therapies'])!=='[]' || JSON.stringify(sessionAttributes['updated_therapies'])!=='[]'){
      
    intent='esco LoadTherapiesIntent 1 '
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco LoadTherapiesIntent 1'+sessionAttributes['access_token'])
          
      }else{
          console.log('esco LoadTherapiesIntent 1')
      }
        
        return SayTherapyIntentHandler.handle(handlerInput);
    }else{
    
            intent='esco LoadTherapiesIntent 2 '
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco LoadTherapiesIntent 2'+sessionAttributes['access_token'])
          
      }else{
          console.log('esco LoadTherapiesIntent 2')
      }
    
    
    
        return  WhichMedicineIntentHandler.handle(handlerInput);
        
    }
    }
};

const SayTherapyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SayTherapyIntent';
    },
    async handle(handlerInput) {
       
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
     let intent='entro SayTherapyIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
               if (sessionAttributes['access_token']!==undefined){
        console.log('entro SayTherapyIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro SayTherapyIntent')
      }
        let access_token = sessionAttributes['access_token'];
        //get Therapies that have therapy.edit='new' e therapy.state = true
        let count_new_therapies = sessionAttributes['count_new_therapies'];
        let new_therapies = sessionAttributes['new_therapies'];

        //get Therapies that have therapy.edit ='updated'
        let count_updated_therapies = sessionAttributes['count_updated_therapies'];
        let updated_therapies = sessionAttributes['updated_therapies'];
     
        let speakOutput;
        //manage Therapies that have therapy.edit='new' to setup
        if(count_new_therapies < new_therapies.length) {
            
            let new_therapy_name  = new_therapies[count_new_therapies].drug.split("-")[0];
              
              const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
             speakOutput=requestAttributes.t('NEW_THERAPY_MSG',new_therapy_name);
            
             
            // utterance of CreateTherapyIntentHandler
        }  
        //manage Therapies that have therapy.edit='updated' to setup
        else if(count_new_therapies >= new_therapies.length && count_updated_therapies < updated_therapies.length){
          
            let updated_therapy_name  = updated_therapies[count_updated_therapies].drug.split("-")[0];
             const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            speakOutput=requestAttributes.t('UPDATED_THERAPY_MSG',updated_therapy_name);
            
            // utterance of ModifyTherapyIntentHandlerReminderIntent
        }
        // if all therapies 'new' and 'updated' are set up, inizialize count and exit from the intent
        else if(count_new_therapies >= new_therapies.length && count_updated_therapies >= updated_therapies.length){
          
            count_new_therapies = 0;
            count_updated_therapies = 0;
            sessionAttributes['count_new_therapies'] = count_new_therapies;
            sessionAttributes['count_updated_therapies'] = count_updated_therapies;
            const timezone = "Europe/Rome";
            let startDate = logic.convertDateForDatabase(moment().tz(timezone).subtract(7, 'days')); // bisogna farlo iniziare prima del giorno stesso
            let endDate = logic.convertDateForDatabase(moment().tz(timezone).add(4, 'months')); 
            let therapiesChecked= await logic.getTherapies(access_token,startDate,endDate); 
            sessionAttributes['all_therapies'] = therapiesChecked.all_therapies;
            
        
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            speakOutput=requestAttributes.t('REMINDERS_COMPLETED_MSG');
            
            
            
    let intent='esco SayTherapyIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
                    if (sessionAttributes['access_token']!==undefined){
        console.log('esco SayTherapyIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco SayTherapyIntent 2')
      }
                return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .getResponse();
          
            
        }
    
    
    
     intent='esco SayTherapyIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
                  if (sessionAttributes['access_token']!==undefined){
        console.log('esco SayTherapyIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco SayTherapyIntent 1')
      }
     
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }

       
};

const CreateTherapyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateTherapyIntent';
    },
    async handle(handlerInput) {
        
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let count_new_therapies = sessionAttributes['count_new_therapies'];
        
         let intent='entro CreateTherapyIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
       
          if (sessionAttributes['access_token']!==undefined){
        console.log('entro CreateTherapyIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro CreateTherapyIntent')
      }
        
        
        // get new_therapies that have therapy.edit='new' e therapy.state = true
        let new_therapies = sessionAttributes['new_therapies'];

        // get reminders_ids w/ all objects reminders_id
        let reminders_ids = sessionAttributes['reminders'];
        
        if (!reminders_ids) {
            reminders_ids = [];
        }

        if(reminders_ids.length===0){
            reminders_ids = [];
        }
        
        // select a therapy
        let therapy = await new_therapies[count_new_therapies];
        
        let last_intake_time = logic.getLastIntakeTime(therapy);

        
        // create the body for the reminders to create through logic.setTherapy
        let reminderBody = await logic.setTherapy(therapy);
        
        // creazione del reminders e alert
        
        for (let i=0; i < reminderBody.remindersAlert.length; i++)  {
            
            
            let reminderAlertResponse = await reminderApiClient.createReminder(reminderBody.remindersAlert[i]);
            
             
            let reminderConfirmationResponse = await reminderApiClient.createReminder(reminderBody.remindersConfirmation[i]);  
           
            // salvataggio alert token
            let reminderAlertToken = await reminderAlertResponse.alertToken;
            let reminderConfirmationToken = await reminderConfirmationResponse.alertToken;
            
            let reminder_id = {
                    "therapy_id": therapy._id,
                    "alertToken" : reminderAlertToken,
                    "confirmationToken" : reminderConfirmationToken,
                    "last_intake_time" : last_intake_time,
                    
                }
            reminders_ids.push(reminder_id);
        }

        sessionAttributes['reminders'] = reminders_ids;
     
        //modifico nel DB il campo therapy.edit in 'saved'
        let access_token = sessionAttributes['access_token'];
        
        let response = await logic.patchTherapy(access_token, therapy._id, "saved");
        
        count_new_therapies ++;
        
       
        
        
        sessionAttributes['count_new_therapies'] = count_new_therapies;
        
        
        
     intent='esco CreateTherapyIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        if (sessionAttributes['access_token']!==undefined){
        console.log('esco CreateTherapyIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco CreateTherapyIntent')
      }
        return SayTherapyIntentHandler.handle(handlerInput);
    }
};

const ModifyTherapyIntentHandler = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ModifyTherapyIntent';
    },
    async handle(handlerInput) {
        
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
     let intent='entro ModifyTherapyIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
         if (sessionAttributes['access_token']!==undefined){
        console.log('entro ModifyTherapyIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro ModifyTherapyIntent')
      }     
        
        
        
        let speakOutput;
        let count_updated_therapies = sessionAttributes['count_updated_therapies'];
        let updated_therapies = sessionAttributes['updated_therapies'];
        let reminders_ids = sessionAttributes['reminders'];
        
        if (!reminders_ids) {
            reminders_ids = [];
        }
        if(reminders_ids.length===0){
            reminders_ids = [];
        }
        
        let therapy = await updated_therapies[count_updated_therapies];
        
        let last_intake_time = logic.getLastIntakeTime(therapy);

        // trovo l'oggetto reminder che ha therapy_id 
        let therapy_todelete = reminders_ids.filter(reminder_id => reminder_id.therapy_id === therapy._id);
        
        //controllo se esiste
        let remindersList = await reminderApiClient.getReminders();
        let aT;
        
        if (remindersList.alerts.length > 0){
          
            
            for (let i=0;i<therapy_todelete.length;i++){    
            for (let d=0; d<remindersList.alerts.length; d++){
                
                aT= remindersList.alerts[d].alertToken;
            
                if (therapy_todelete.length > 0){
                    if (aT === therapy_todelete[0].alertToken){
                        await reminderApiClient.deleteReminder(therapy_todelete[i].alertToken);
                        await reminderApiClient.deleteReminder(therapy_todelete[i].confirmationToken);
                    }
                }
            }
        
        }
        
        }
        
        
        // risalvo in sessione i reminders rimanenti (rimuovendo quello eliminato)
        let reminders_ids_left = reminders_ids.filter(reminder_id => reminder_id.therapy_id !== therapy._id);
        sessionAttributes['reminders'] = reminders_ids_left;
       
        // se il therapy.state è true vuol dire che la terapia è ancora attiva quindi andiamo a reimpostare reminders con dati aggiornati
      
         if (therapy.state === true){
            let reminderBody = await logic.setTherapy(therapy);
            
            let reminders_ids = sessionAttributes['reminders'];
        
            for (let i=0; i < reminderBody.remindersAlert.length; i++)  {
                 
                
                let reminderAlertResponse = await reminderApiClient.createReminder(reminderBody.remindersAlert[i]);
                let reminderConfirmationResponse = await reminderApiClient.createReminder(reminderBody.remindersConfirmation[i]);  
           
                //salvataggio alert token dei reminders apppena creati
                 let reminderAlertToken = await reminderAlertResponse.alertToken;
                 let reminderConfirmationToken = await reminderConfirmationResponse.alertToken;
                //aggiungo l'oggetto nell'array reminders_ids
                let reminder_id = {
                        "therapy_id": therapy._id, // controlla che sia 'id' il nome del campo
                        "alertToken" : reminderAlertToken,
                        "confirmationToken" : reminderConfirmationToken,
                        "last_intake_time" : last_intake_time
                    }
                
                reminders_ids.push(reminder_id);
            }
            sessionAttributes['reminders'] = reminders_ids;
        }
     
        
        // modifico nel DB il campo 'edit' in 'saved'
        let access_token = sessionAttributes['access_token'];
        
 
          
        if (therapy.edit === 'updated'){
            let response = await logic.patchTherapy(access_token, therapy._id, "saved"); 
        }
        else if (therapy.edit === 'todelete'){
            let response = await logic.patchTherapy(access_token, therapy._id, "deleted"); 
        }
        
        count_updated_therapies ++;
        
        sessionAttributes['count_updated_therapies'] = count_updated_therapies;
        
        
        
      intent='esco ModifyTherapyIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
           
        if (sessionAttributes['access_token']!==undefined){
        console.log('esco ModifyTherapyIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco ModifyTherapyIntent')
      }
        return SayTherapyIntentHandler.handle(handlerInput);
     
            
    }
};





const WhichMedicineTodayIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhichMedicineTodayIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
     
        let intent='entro WhichMedicineTodayIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        if (sessionAttributes['access_token']!==undefined){
        console.log('entro WhichMedicineTodayIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro WhichMedicineTodayIntent')
      }
   
   
        sessionAttributes['signed_medicine_MSG'] = ` `;
        let access_token = sessionAttributes['access_token'];

      
    if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
        
        
        
            let intent='esco WhichMedicineTodayIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
       
        
        if (sessionAttributes['access_token']!==undefined){
        console.log('esco WhichMedicineTodayIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco WhichMedicineTodayIntent 1')
      }
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
 
    let list_therapies = sessionAttributes['all_therapies'];
    
            let intakes_all =[];
            for (let t=0; t < list_therapies.length; t++)  {
                intakes_all= intakes_all.concat(list_therapies[t].intakes);
            }
            
            
          // avrei dovuto mettere come filtro missed o programmed ma è capitato che fosse programmed ma doveva essere missed
             const timezone = "Europe/Rome";
            const currentTime = moment().tz(timezone);
            let today = currentTime; 
       
            let list_programmed_intakes = intakes_all.filter(intake => logic.convertDateFromDatabase(intake.programmed_date).format('l')=== today.format('l'));
           
          
        
           let list_today_old_intakes = list_programmed_intakes.filter(intake => logic.convertDateFromDatabase(intake.programmed_date).isSameOrBefore(today))//,'hour'
            list_programmed_intakes = list_programmed_intakes.filter(intake => logic.convertDateFromDatabase(intake.programmed_date).isSameOrAfter(today))
            
            
           //list_programmed_intakes = list_programmed_intakes.filter(intake => (logic.convertDateFromDatabase(intake.programmed_date).format('LT')).isSameOrBefore(today.format('LT')))
             
      
            
        let speakOutput;
        if (list_programmed_intakes.length===0){
          
             const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
             speakOutput=requestAttributes.t('NO_MEDICINE_MSG');
        }else{
        speakOutput=list_programmed_intakes[0].drug.split("-")[0];
        speakOutput= speakOutput.concat(' alle ');
        speakOutput= speakOutput.concat(logic.convertDateFromDatabase(list_programmed_intakes[0].programmed_date).format('LT'), ' ');
         for (let t=1; t < list_programmed_intakes.length; t++)  { // 
                
               
                speakOutput= speakOutput.concat(' e ')
                
                
                speakOutput= speakOutput.concat(list_programmed_intakes[t].drug.split("-")[0], ' alle ');
                
                speakOutput= speakOutput.concat(logic.convertDateFromDatabase(list_programmed_intakes[t].programmed_date).format('LT'), ' ');
               
                
            }
        }
       
          if (list_today_old_intakes.length!==0){ 
            speakOutput= speakOutput.concat('poi dovresti avere già preso ');
               for (let t=0; t < list_today_old_intakes.length; t++)  {
                speakOutput= speakOutput.concat(list_today_old_intakes[t].drug.split("-")[0], ' alle ');
                speakOutput= speakOutput.concat(logic.convertDateFromDatabase(list_today_old_intakes[t].programmed_date).format('LT'), ' ');
                 if (list_programmed_intakes.length< t-1){
                    speakOutput= speakOutput.concat(' e ')
                }
            }
            
          }
             
       speakOutput= speakOutput.concat('. Se vuoi controllare quali farmaci hai confermato di aver preso dimmi: ho dimenticato dei farmaci?  ') 
    
       
       
       
     intent='esco WhichMedicineTodayIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
        if (sessionAttributes['access_token']!==undefined){
        console.log('esco WhichMedicineTodayIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco WhichMedicineTodayIntent 2')
      }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .getResponse();
        
    }
};











const ConfirmIntakeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConfirmIntakeIntent';
    },
    async handle(handlerInput) {
      
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let intent='entro ConfirmIntakeIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        if (sessionAttributes['access_token']!==undefined){
        console.log('entro ConfirmIntakeIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro ConfirmIntakeIntent')
      }     
        
       
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        let remindersList = await reminderApiClient.getReminders();
        
        
        let count_intakes = 0;
        sessionAttributes['count_intakes'] = count_intakes;
        sessionAttributes['signed_medicine_MSG'] = ` `;
        let access_token = sessionAttributes['access_token'];
       

         const timezone = "Europe/Rome";
         
    if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
        
        
                   let intent='esco ConfirmIntakeIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
     if (sessionAttributes['access_token']!==undefined){
        console.log('esco ConfirmIntakeIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco ConfirmIntakeIntent 1')
      }
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
    
        // Post logs
        let typeOfAccess = 'Confirm Intake Intent';
        let logResponse = await logic.postLogs(access_token, typeOfAccess);
       
       
           
           
           
     
        
     intent='esco ConfirmIntakeIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
        if (sessionAttributes['access_token']!==undefined){
        console.log('esco ConfirmIntakeIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco ConfirmIntakeIntent 2')
      }   
        return WhichMedicineIntentHandler.handle(handlerInput); 
    }
};

const WhichMedicineIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhichMedicineIntent';
    },
   
   async handle(handlerInput) {
       
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        
        
    let intent='entro WhichMedicineIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
         if (sessionAttributes['access_token']!==undefined){
        console.log('entro WhichMedicineIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro WhichMedicineIntent')
      }       
        
        let count_intakes = sessionAttributes['count_intakes'];
        let list_interval_intakes =[];
        let time_slot=[];
        let speakOutput
       
        if (!count_intakes){
            count_intakes = 0;
            sessionAttributes['count_intakes'] = count_intakes;
        }
        if(count_intakes===0){
            let list_therapies = sessionAttributes['all_therapies'];
           
            let intakes_all =[];
            for (let t=0; t < list_therapies.length; t++)  {
                intakes_all= intakes_all.concat(list_therapies[t].intakes);
            }
            
            let list_programmed_intakes = intakes_all.filter(intake => intake.status === 'programmed');
        
            // creazione dell'attributo che tiene in memoria quando il paziente dice di aver preso le medicine, ogni tot cambia messaggio al prossimo reminder
            // aggiungere attributo al file constants. il counter incrementa a yes intent o no intent?
            
            
          
            //prendiamo gli intakes compresi nell'intervallo di tempo t precedente alla richiesta
            const timezone = "Europe/Rome"; 
            const currentTime = moment().tz(timezone);
       
            let min
            let max
            let intake
            for (let t=0; t < list_programmed_intakes.length; t++)  {
                let temp= Math.floor((list_programmed_intakes[t].max_delay));
                 min = moment(currentTime).tz(timezone).startOf('minute').subtract(temp, 'minutes'); //modificare in base a max_delay
                 max = moment(currentTime).tz(timezone).startOf('minute').add(temp, 'minutes');
                
                 intake=list_programmed_intakes[t];
               
                 if( moment(logic.convertDateFromDatabase(intake.programmed_date)).isSameOrAfter(min) && moment(logic.convertDateFromDatabase(intake.programmed_date)).isSameOrBefore(max) )
                 {
                  list_interval_intakes.push(intake)
                  time_slot.push(list_programmed_intakes[t].programmed_date)
                     
                 }
                
            }
 
            sessionAttributes['list_interval_intakes'] = list_interval_intakes;
             sessionAttributes['intake_time_slot']=time_slot
          
        }else{
            list_interval_intakes=sessionAttributes['list_interval_intakes']
            time_slot=sessionAttributes['intake_time_slot']
            
        }
       
       
       
        if(list_interval_intakes.length === 0){
            
            
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speakOutput=requestAttributes.t('MEDICINE_OVER_MSG');
            
            
            
             let intent='esco WhichMedicineIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
          if (sessionAttributes['access_token']!==undefined){
        console.log('esco WhichMedicineIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco WhichMedicineIntent 1')
      }
        
            return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .getResponse();
        }
        
       
        
        
        
        
        let medicine_name  = list_interval_intakes[count_intakes].drug.split("-")[0];
        let medicine_posology = list_interval_intakes[count_intakes].posology;
        
        let signed_medicine_MSG = sessionAttributes['signed_medicine_MSG'];
        
        
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
         speakOutput=requestAttributes.t('TAKEN_CONFIRMATION_MSG',signed_medicine_MSG,medicine_posology,medicine_name);
        
        sessionAttributes['signed_medicine_MSG'] = ` `;
        
      intent='esco WhichMedicineIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco WhichMedicineIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco WhichMedicineIntent 2')
      }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
     
  

       
   }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        
        

       
      
        let locale= "it-IT"
        let speakOutput
         
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
       
       
        let intent='entro yesIntent'
        if (sessionAttributes['access_token'] !== undefined){
          
        let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
        }
              if (sessionAttributes['access_token']!==undefined){
        console.log('entro yesIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro yesIntent')
      }
      
        let count_intakes = sessionAttributes['count_intakes'];
        let list_interval_intakes = sessionAttributes['list_interval_intakes'];
         let time_slot=sessionAttributes['intake_time_slot']
        let access_token = sessionAttributes['access_token'];
        let intake_id = list_interval_intakes[count_intakes]._id;
        let time_intake = logic.convertDateFromDatabase(list_interval_intakes[count_intakes].programmed_date);
        let status = "taken";
        const timezone = "Europe/Rome";
        let currentTime = moment().tz(timezone);
        let delay = moment.duration(currentTime.diff(time_intake, 'minutes'));
        let intake_delay = Number(delay);
        // salvo il therapy id specifico di cui stiamo parlando, tramite il count_intakes
        let intervalTherapy_id = list_interval_intakes[count_intakes].therapy_id;
        let intake_time_slot= time_slot[count_intakes]
        sessionAttributes['last_intake'] = list_interval_intakes[count_intakes];
        console.log('intervalTherapy_id ' + intervalTherapy_id)
        // filtro oggetti reminders che hanno therapy_id uguale a quello appena salvato 
        let reminders = sessionAttributes['reminders'];   
       
       
        
       let reminder_idToUpdate = reminders.filter(reminders => reminders.therapy_id === intervalTherapy_id);
       
               if (reminder_idToUpdate.length > 1){
           let remindersList = await reminderApiClient.getReminders();
           remindersList=remindersList.alerts
           
            let temp_rem
            let rules 
            let today=logic.convertDateForDatabase(moment().tz( "Europe/Rome")).getDay() // 0 - sunday, 6-saturday
            if (today===0){
                today='SU'
            }else if(today===1){
                today='MO'
            }
            else if(today===2){
                today='TU'
            }
            else if(today===3){
                today='WE'
            }
            else if(today===4){
                today='TH'
            }
            else if(today===5){
                today='FR'
            }
            else if(today===6){
                today='SA'
            }
            let idx_rem=[];
            console.log('today '+ today)
            console.log('qui')
           
            for (let i=0;i<reminder_idToUpdate.length;i++){
                temp_rem=remindersList.filter(reminders => reminders.alertToken === reminder_idToUpdate[i].alertToken)
                console.log(' tem_tem '+ JSON.stringify(temp_rem))
                rules=temp_rem[0].trigger.recurrence.recurrenceRules
                rules=rules.toString()
               console.log(' rules ' + rules)
                 let check_idx=true
                 let start_idx=0
                while(check_idx){
                    
                     let idx_byday=rules.indexOf("BYDAY",start_idx)
                         if (idx_byday>=0){
                         start_idx=idx_byday+5
                         let day_temp=rules[start_idx+1]+rules[start_idx+2]
                         console.log(' day temp ' + day_temp)
                         console.log('idx '+day_temp)
                                if (day_temp === today){
                                    idx_rem.push(i)
                                    check_idx=false
                                     console.log(i)
                                }       
                    }else{
                    
                        check_idx=false
                    }
                    }
                }
               
            
            
            
            console.log('idx_rem ' + idx_rem)
              console.log('rem list ' + JSON.stringify(temp_rem))
          console.log(intake_time_slot)
          
          if (idx_rem.length>1){
              console.log(' qui ')
             let final_idx;
             
           
               for (let u=0;u<idx_rem.length;u++){
                   let temp =remindersList.filter(reminders => reminders.alertToken === reminder_idToUpdate[idx_rem[u]].alertToken)
                  
                    console.log('temp ' + JSON.stringify(temp))
                let rules=temp[0].trigger.recurrence.recurrenceRules
                console.log('rules '+ rules)
                rules=rules.toString()
                let idx_byhour=rules.indexOf("BYHOUR=")
                let h=rules[idx_byhour+7]+rules[idx_byhour+8]
                console.log (' H ' + h)
               console.log('slot ' + intake_time_slot)
               let idx_slot=intake_time_slot.indexOf("T")
                let h_slot =intake_time_slot[idx_slot+1]+intake_time_slot[idx_slot+2]
                console.log('H2 '+ h_slot)
               h_slot=h_slot.toString()
               let h_string='0'+h[0]
         
               if(  h===h_slot || h_slot===h_string )
                 {
                     console.log('dentro')
                        final_idx=u;
                 }
               }
               idx_rem=idx_rem[final_idx]
          }
          
          console.log(' idx_rem last ' + idx_rem)
           reminder_idToUpdate=[reminder_idToUpdate[idx_rem]]
           console.log(reminder_idToUpdate)
           
           
    }
        let reminder_idToUpdate_old=reminder_idToUpdate
           
        if (intake_delay<0){
               
                    let reminderToUpdate=reminder_idToUpdate[0].alertToken;
                   
                    let ReminderConfirmation = await reminderApiClient.getReminder(reminderToUpdate);
                  
                    
                    
                   
                    
                         
                          
                              
                    let newTimeA=moment().tz( "Europe/Rome").add(12,'h')
                   
                    
                  
                    
                    
                    //newTime=newTime.format('YYYY-MM-DDTHH');
                             
                    //modifico il body sostituendo la startDateTime
                   
                    let updatedReminderA =  ReminderConfirmation;
                       
                      
                    updatedReminderA.trigger.recurrence.startDateTime = newTimeA;
                
               
                    const alertTokenA =reminderToUpdate
                    await reminderApiClient.deleteReminder(alertTokenA)  
                
                
                    let endA = ReminderConfirmation.trigger.recurrence.endDateTime;
                    let recurrenceRulesUpdatedA=ReminderConfirmation.trigger.recurrence.recurrenceRules
                    let textUpdatedA=ReminderConfirmation.alertInfo.spokenInfo.content[0].text;
                    let new_upA=logic.convertDateFromDatabase(newTimeA)
                    let end_upA=logic.convertDateFromDatabase(endA)
               
                    if (moment(newTimeA).tz(timezone).isSameOrBefore(moment(endA).tz(timezone)))   {
               
                           let  bodyA=util.UpdateReminderBody(new_upA, end_upA, timezone, locale,textUpdatedA,recurrenceRulesUpdatedA)
                         
                                    
                           let updatedRemA = await reminderApiClient.createReminder(bodyA);
                          
                           let reminderAlertTokenA = await updatedRemA.alertToken;
                           
                           let reminders_ids_leftA_temp = reminders.filter(reminders => reminders.alertToken === alertTokenA);
                      
                             
                           let reminders_ids_leftA = reminders.filter(reminders => reminders.alertToken !== alertTokenA);
                          
                           let reminders_newA={
                                                "therapy_id": intervalTherapy_id,
                                                "alertToken" :reminderAlertTokenA,
                                                "confirmationToken" : reminders_ids_leftA_temp[0].confirmationToken,
                                                "last_intake_time" : currentTime
                           }
                            
                           reminders_ids_leftA.push(reminders_newA);      
                           sessionAttributes['reminders'] = reminders_ids_leftA;
                           
            
            }   
        
    }
    
    
   
   reminders=sessionAttributes['reminders'];
    
    reminder_idToUpdate = reminders.filter(reminders => reminders.confirmationToken === reminder_idToUpdate_old[0].confirmationToken);
   
    try {
             if (intake_delay < ((list_interval_intakes[count_intakes].max_delay)-5)){
                
             
                      
                            // eliminare anche quello non confirmation se l'orario è prima che suoni
                           
                            let confirmationTokenToUpdate = reminder_idToUpdate[0].confirmationToken;
                          console.log('confirmationToken ' + confirmationTokenToUpdate)
                           
                           let oldReminderConfirmation = await reminderApiClient.getReminder(confirmationTokenToUpdate);
                             
                                 
                    
                           
                          
                            let  newTime=moment().tz( "Europe/Rome").add(12,'h')
                        
                            //newTime=newTime.format('YYYY-MM-DDTHH');
                                     
                            //modifico il body sostituendo la startDateTime
                            
                            let updatedReminder =  oldReminderConfirmation;
                            
                            updatedReminder.trigger.recurrence.startDateTime = newTime;
                    
                       
                            const alertToken = confirmationTokenToUpdate;
                            await reminderApiClient.deleteReminder(alertToken)  
                         let remindersList = await reminderApiClient.getReminders();
                        console.log(' rem list 2' + JSON.stringify(remindersList))
                        
                            let end = oldReminderConfirmation.trigger.recurrence.endDateTime;
                     
                        
                            let recurrenceRulesUpdated=oldReminderConfirmation.trigger.recurrence.recurrenceRules
                    
                            let textUpdated=oldReminderConfirmation.alertInfo.spokenInfo.content[0].text;
                    
                        
                            let new_up=logic.convertDateFromDatabase(newTime)
                            let end_up=logic.convertDateFromDatabase(end)
                       
                             if (moment(newTime).tz(timezone).isSameOrBefore(moment(end).tz(timezone)))   {
                             console.log(' check time '+ moment(newTime).tz(timezone).isSameOrBefore(moment(end).tz(timezone)))
                             
                                   let  body=util.UpdateReminderBody(new_up, end_up, timezone, locale,textUpdated,recurrenceRulesUpdated)
                             console.log(' body updated rem '+ JSON.stringify(body))    
                                        
                                   let updatedRem = await reminderApiClient.createReminder(body);
                                  
                                   let reminderAlertToken = await updatedRem.alertToken;
                                   let reminders_ids_left = reminders.filter(reminders => reminders.confirmationToken !== confirmationTokenToUpdate);
                                   let reminders_new = reminders.filter(reminders => reminders.confirmationToken ===confirmationTokenToUpdate)
                                   
                                   
                                   
                                      let reminders_newA={
                                                "therapy_id": intervalTherapy_id,
                                                "alertToken" :reminders_new[0].alertToken,
                                                "confirmationToken" : reminderAlertToken,
                                                "last_intake_time" : currentTime
                                        }
                                   
                                   reminders_ids_left.push(reminders_newA);      
                                   sessionAttributes['reminders'] = reminders_ids_left;
                                    console.log ('reminders last last ' + JSON.stringify(sessionAttributes['reminders']))
                                     let remindersList = await reminderApiClient.getReminders();
                                    console.log(' rem list 3' + JSON.stringify(remindersList))
                    }       
             }         
} catch (error ){
    console.log ('errore quando cerca il confirm ' + error)
}
       
      
        
        // Post logs
        let typeOfAccess = 'Yes Intent';
        let logResponse = await logic.postLogs(access_token, typeOfAccess);
       // console.log('logresponse   ' + logResponse)
        //modifica all_therapies da sessione 
        let list_therapies = sessionAttributes['all_therapies'];
        let medicineIndex = list_therapies.findIndex(medicine => medicine._id === intervalTherapy_id);

        let intakeIndex = list_therapies[medicineIndex].intakes.findIndex(intake => intake._id === intake_id);

        list_therapies[medicineIndex].intakes[intakeIndex].status = status;
        sessionAttributes['all_therapies'] = list_therapies;
        

        
        count_intakes++;
        sessionAttributes['count_intakes'] = count_intakes;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        sessionAttributes['signed_medicine_MSG'] =requestAttributes.t('TAKEN_CONFIRMATION_ANS_MSG');
        let response = await logic.patchIntake(access_token, intake_id, status, intake_delay);
        
        
        
            if( count_intakes === list_interval_intakes.length) {
            count_intakes = 0;
            sessionAttributes['count_intakes'] = count_intakes;
            
            
            
            
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('TAKEN_CONFIRMATION_ANS_LAST_MSG');
      
            sessionAttributes['list_interval_intakes'] = [];
            sessionAttributes['intake_time_slot']=[];
            
                
    let intent='esco yesIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            
            
            
          if (sessionAttributes['access_token']!==undefined){
        console.log('esco yesIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco yesIntent 1')
      }
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt()
                .getResponse();
        }
       
       
      intent='esco yesIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
       
         if (sessionAttributes['access_token']!==undefined){
        console.log('esco yesIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco yesIntent 2')
      }
       
        return WhichMedicineIntentHandler.handle(handlerInput) 
        
      
    }
  
};


const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    async handle(handlerInput) {
     
        
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        
        let intent='entro NoIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        if (sessionAttributes['access_token']!==undefined){
        console.log('entro NoIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro NoIntent')
      }        
        let count_intakes = sessionAttributes['count_intakes'];
        
            if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
        
        
        
        let list_interval_intakes = sessionAttributes['list_interval_intakes'];
         
        
        
        if( count_intakes >= list_interval_intakes.length-1) {
            count_intakes = 0;
            sessionAttributes['count_intakes'] = count_intakes;
            
            const speakOutput =requestAttributes.t('TAKEN_CONFIRMATION_ANS_NO_LAST_MSG')
            sessionAttributes['list_interval_intakes'] = [];
             sessionAttributes['intake_time_slot']=[];
            
             intent='esco NoIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco NoIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco NoIntent 2')
      } 
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt()
                .getResponse();
        }
        count_intakes ++;
        
        sessionAttributes['count_intakes'] = count_intakes;
        sessionAttributes['signed_medicine_MSG'] = requestAttributes.t('TAKEN_CONFIRMATION_ANS_NO_MSG');
        
        
        
        
    intent='esco NoIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
             if (sessionAttributes['access_token']!==undefined){
        console.log('esco NoIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco NoIntent 1')
      } 
        return WhichMedicineIntentHandler.handle(handlerInput);
    }
};

const LastIntakeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LastIntakeIntent';
    },
    async handle(handlerInput) {
        
        
        
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        
        let intent='entro LastIntakeIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
             if (sessionAttributes['access_token']!==undefined){
        console.log('entro LastIntakeIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro LastIntakeIntent')
      }    
        
        let therapy=sessionAttributes['last_intake']
        
            if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
        
        
        
        
               let intent='esco LastIntakeIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco LastIntakeIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco LastIntakeIntent 1')
      }   
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
        
        let drugname_w = therapy.drug.split("-")[0];
        let posology_w = therapy.posology;
        let timezone="Europe/Rome";
        let date_w = logic.convertDateFromDatabase(therapy.programmed_date)    
          
         date_w=date_w.format('LT')
        
        const speakOutput=requestAttributes.t('LAST_INTAKE_MSG',posology_w,drugname_w,date_w);
        
        
        
        
    intent='esco LastIntakeIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
         if (sessionAttributes['access_token']!==undefined){
        console.log('esco LastIntakeIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco LastIntakeIntent 2')
      } 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
   
    }
};

const RequestMissedIntakesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RequestMissedIntakesIntent';
    },
   async handle(handlerInput) {
      
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      
               let intent='entro RequestMissedIntakesIntent'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
           if (sessionAttributes['access_token']!==undefined){
        console.log('entro RequestMissedIntakesIntent '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro RequestMissedIntakesIntent')
      }    
        sessionAttributes['signed_medicine_MSG'] = ` `;
        let access_token = sessionAttributes['access_token'];

      
    if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
         if (sessionAttributes['access_token']!==undefined){
        console.log('esco RequestMissedIntakesIntent 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco RequestMissedIntakesIntent 1')
      } 
            let intent='esco RequestMissedIntakesIntent 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            
            
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
 
    let list_therapies = sessionAttributes['all_therapies'];
    
            let intakes_all =[];
            for (let t=0; t < list_therapies.length; t++)  {
                intakes_all= intakes_all.concat(list_therapies[t].intakes);
            }
            
            
          // avrei dovuto mettere come filtro missed o programmed ma è capitato che fosse programmed ma doveva essere missed
             const timezone = "Europe/Rome";
            const currentTime = moment().tz(timezone);
            let today = currentTime; 
       
            let list_missed_intakes = intakes_all.filter(intake => logic.convertDateFromDatabase(intake.programmed_date).format('l')=== today.format('l'));
          list_missed_intakes = list_missed_intakes.filter(intake => intake.status === 'missed');
   
            
           //list_programmed_intakes = list_programmed_intakes.filter(intake => (logic.convertDateFromDatabase(intake.programmed_date).format('LT')).isSameOrBefore(today.format('LT')))
             
      
        let speakOutput;
        if (list_missed_intakes.length===0){
          
             const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
             speakOutput=requestAttributes.t('ALL_TAKEN_MSG');
        }else{
        speakOutput=list_missed_intakes[0].drug.split("-")[0];
        speakOutput= speakOutput.concat(' alle ');
        speakOutput= speakOutput.concat(logic.convertDateFromDatabase(list_missed_intakes[0].programmed_date).format('LT'), ' ');
         for (let t=1; t < list_missed_intakes.length; t++)  { // 
                
               
                speakOutput= speakOutput.concat(' e ')
                
                
                speakOutput= speakOutput.concat(list_missed_intakes[t].drug.split("-")[0], ' alle ');
                
                speakOutput= speakOutput.concat(logic.convertDateFromDatabase(list_missed_intakes[t].programmed_date).format('LT'), ' ');
               
                
            }
        }
       
             
      
      
        //console.log(logResponse)
    intent='esco RequestMissedIntakesIntent 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
          if (sessionAttributes['access_token']!==undefined){
        console.log('esco RequestMissedIntakesIntent 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco RequestMissedIntakesIntent 2')
      } 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt()
            .getResponse();
        
    }
};

const RequestAdherenceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RequestAdherenceIntent';
    },
    async handle(handlerInput) {
     
     const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let intent='entro RequestAdh'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
        
             if (sessionAttributes['access_token']!==undefined){
        console.log('entro RequestAdh '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro RequestAdh')
      }  
        
        let access_token = sessionAttributes['access_token'];
        
            if ( sessionAttributes['flag_therapies']===1){
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput=requestAttributes.t('CHECK_THERAPIES_MSG');
             if (sessionAttributes['access_token']!==undefined){
        console.log('esco RequestAdh 1 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco RequestAdh 1')
      }  
        let intent='esco RequestAdh 1'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
            
    }
   
        let speakOutput
        const dataForAdherence = await logic.getTherapiesForAdherence(access_token);
            
           
        let adherence = dataForAdherence.adherence;
         
             const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
     
        // TENGO?
        if (adherence < 30) {
            adherence=adherence.toString();
           
            speakOutput=requestAttributes.t('LOW_ADHERENCE',adherence);
        }
        else if (adherence < 80) {
            adherence=adherence.toString();
           
             speakOutput=requestAttributes.t('MID_ADHERENCE',adherence);
           
         }
        else if (adherence >= 80) {
             adherence=adherence.toString();
                speakOutput=requestAttributes.t('HIGH_ADHERENCE',adherence);
             }
        else {
            adherence=adherence.toString();
           
             speakOutput=requestAttributes.t('ERROR_ADHERENCE');
            
        }

        // Post logs
        let typeOfAccess = 'Request Adherence Intent';
        let logResponse = await logic.postLogs(access_token, typeOfAccess);
        
      intent='esco RequestAdh 2'
      if (sessionAttributes['access_token'] !== undefined){
          
      let resPost= await logic.postLogs(sessionAttributes['access_token'], intent,logic.convertDateForDatabase(moment().tz( "Europe/Rome")))
     
   }
            if (sessionAttributes['access_token']!==undefined){
        console.log('esco RequestAdh 2 '+sessionAttributes['access_token'])
          
      }else{
          console.log('esco RequestAdh 2')
      } 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
// ALEXA CHIEDI A MEDICO VIRTUALE DI CANCELLARE TUTTI I DATI IN SESSIONE
const DeleteDataSessionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DeleteDataSessionIntent';
    },
        async handle(handlerInput) {

        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
     if (sessionAttributes['access_token']!==undefined){
        console.log('entro delete data '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro delete data')
      } 
        
        
        delete sessionAttributes['access_token'];
        delete sessionAttributes['intake_time_slot'];
        delete sessionAttributes['name'];
        delete sessionAttributes['reminders'];
        delete sessionAttributes['list_interval_intakes'];
        delete sessionAttributes['count_intakes'];
        delete sessionAttributes['signed_medicine_MSG'];
        delete sessionAttributes['all_therapies'];
        //delete sessionAttributes['edit_therapies'];
        delete sessionAttributes['new_therapies'];
        delete sessionAttributes['updated_therapies'];
        delete sessionAttributes['count_new_therapies'];
        delete sessionAttributes['count_updated_therapies'];
        delete sessionAttributes['therapies'];
        delete  sessionAttributes['last_intake'];
        delete  sessionAttributes['flag_therapies'];
        delete  sessionAttributes['current_intent'];
        delete  sessionAttributes['user_id'];
       
        let rem=await reminderApiClient.getReminders()
        let temp
        for(let j =0; j < rem.totalCount;j++){
             temp=rem.alerts[j].alertToken;
             await reminderApiClient.deleteReminder(temp);
         
         } 
       
                if (sessionAttributes['notification_object_id']===[] || sessionAttributes['notification_object_id']===undefined){
            
         
            let dummy=1; // useless  
        }else{
          
            let alexa_id_response=await logic.DeleteAlexaId(sessionAttributes['access_token'],sessionAttributes['notification_object_id'])
            sessionAttributes['notification_object_id']=[]
         
        }
        const speakOutput = 'Ho eliminato TUTTI i dati in sessione!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const UserErrorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserErrorIntent';
    },
        async handle(handlerInput) {

        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
     if (sessionAttributes['access_token']!==undefined){
        console.log('entro ERROR USER '+sessionAttributes['access_token'])
          
      }else{
          console.log('entro ERROR USER')
      } 
        
        
        
        
        const speakOutput = "Ho salvato che c'è stato un errore";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const NotificationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NotificationIntent';
    },
        async handle(handlerInput) {
        console.log('entro notifiche')
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput
        
        if (sessionAttributes['notification_object_id']===[] || sessionAttributes['notification_object_id']===undefined){
        let alexa_id= handlerInput.requestEnvelope.session.user.userId
         sessionAttributes['alexa_id']=alexa_id
        let alexa_id_response=await logic.PostAlexaId(sessionAttributes['access_token'],alexa_id)
       sessionAttributes['notification_object_id']=alexa_id_response._id;
        console.log('not id ' + sessionAttributes['notification_object_id'])
      
        
         speakOutput = 'Mi hai dato il permesso di inviarti le notifiche';
            
        }else{
            speakOutput="Posso già inviarti le notifiche"
        }
        console.log('esco notifiche')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const DeleteNotificationIntentHandler ={

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DeleteNotificationIntent';
    },
        async handle(handlerInput) {
        console.log('entro elimina notifiche')
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput
        
        if (sessionAttributes['notification_object_id']===[] || sessionAttributes['notification_object_id']===undefined){
            
         speakOutput="Non ho ancora il permesso di inviarti le notifiche"
            
        }else{
           
            
            
            let alexa_id_response=await logic.DeleteAlexaId(sessionAttributes['access_token'],sessionAttributes['notification_object_id'])
            sessionAttributes['notification_object_id']=[]
         
        
            speakOutput = 'Ho eliminato il permesso di inviarti le notifiche';
        }
        console.log('entro elimina notifiche')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



const HelpUserIntentHandler = {
   canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpUserIntent';
    },
    handle(handlerInput, error) {
        const speakOutput = 'Ciao, puoi chiedermi: Alexa, apri ciao doc, per controllare e impostare le tue terapie, oppure Alexa, chiedi a ciao doc di segnarsi le medicine, \
        dopo che hai preso le medicine, oppure Alexa, chiedi a ciao doc quali medicine devo prendere oggi, per sapere che medicine devi prendere ,oppure Alexa, chiedi a ciao doc se ho dimenticato di dei farmaci, per sapere se hai dimenticato delle medicine, \
        oppure alexa, chiedi a ciao doc qual è la mia aderenza, per sapere la tua percentuale di aderenza alle terapie,oppure, alexa chiedi a ciao doc qual è l ultima medicina che ho preso \
        per sapere qual è l ultima medicina che hai preso, oppure alexa, chiedi a ciao doc cancella tutti i dati in sessione, per eliminare tutti \
        i tuoi dati su alexa';
     

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, come posso aiutarti?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, alla prossima!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Scusa, ho avuto un problema nella risposta alla tua richiesta.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SecurityCodeIntentHandler,
        LoadTherapiesIntentHandler,
        SayTherapyIntentHandler,
        CreateTherapyIntentHandler,
        ModifyTherapyIntentHandler,
        WhichMedicineTodayIntent,
        ConfirmIntakeIntentHandler,
        WhichMedicineIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        LastIntakeIntentHandler,
        RequestMissedIntakesIntentHandler,
        RequestAdherenceIntentHandler,
        DeleteDataSessionIntentHandler,
        UserErrorIntentHandler,
        NotificationIntentHandler,
        DeleteNotificationIntentHandler,
        HelpUserIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoadAttributesRequestInterceptor,
        interceptors.LocalisationRequestInterceptor,interceptors.CheckTherapiesRequestInterceptor)
    .addResponseInterceptors(
        interceptors.SaveAttributesResponseInterceptor,interceptors.PostIntentResponseInterceptor)//,
    .withPersistenceAdapter(util.getPersistenceAdapter())
    .withApiClient(new Alexa.DefaultApiClient())
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
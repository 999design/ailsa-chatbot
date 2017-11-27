var builder = require("botbuilder");
var analytics = require('../analytics');

// =============================================
// CONTENT


const script = {

	entry: {
		text: 	"Hello, I'm Ailsa, and I'm a robot. " + String.fromCharCode(0xD83E, 0xDD16) + "\n\n\n\nI can help you find out what the Private Residential Tenancy will mean to you if you're a private landlord or tenant. Are you a landlord or a tenant?",
		options: {
			"I'm a tenant": 	"B1",
			"I'm a landlord": 		"B2"
		}, 
		action: (session, next) => {
			console.log("action");
		}
	},

	B1: {
		text: 	"OK! Do you rent from a private landlord or a letting agent?", 
		options: {
			"Yes": 										"C1",
			"Yes, but I live with my landlord": 		"C1a",
			"No": 										 "C1b",
			"I don't know what type of tenancy I have": "C2",
		}
	},

	B2: {
		text: 	"OK, great. Do your tenants live with you?", 
		options: {
			"Yes": 	"C3",
			"No": 	"C4"
		}
	},

	C1: {
		text: 	"Did you sign your tenancy agreement or move in before 1st December 2017?", 
		options: {
			"Yes": 							"D0",
			"No, after the 1st December": 	"D1"
		}
	},

	C1a: {
		text: 	"If you live with your landlord then you're a common law tenant and the Private Residential Tenancy doesn't apply."
	},

	C1b: {
		text: 	"If you're not a tenant then the private tenancy doesn't apply to you."
	},

	C2: {
		text: 	"Use this tool to find out what type of tenancy you have, then come back to find out how PRT might affect you. https://scotland.shelter.org.uk/get_advice/downloads_and_tools/online_checkers/what_kind_of_tenancy_do_i_have", 
		options: {
			"Start again": 					"B1"
		}
	},

	C3: {
		text: 	"If your tenants live with you then they are a common law tenant and the private residential tenancy doesn't apply. I can tell you more about the Private Residential Tenancy anyway? What would you like to know more about?",		options: {
			"Rent, deposits and fees": 	"E4",
			"Tenancy agreements": 		"E5",
			"Disputes": 				"E6"
		}
	},

	C4: {
		text: 	"Did your tenants move in after 1st December 2017?",
		options: {
			"Yes": 							"D2",
			"No, before the 1st December": 	"D3"
		}
	},

	D0: {
		text: 	"If you were already renting and were an assured or short assured tenant, on 1 December 2017, your tenancy will continue as normal until you or your landlord bring it to an end following the correct procedure. If your landlord then offers you a new tenancy this will be a private residential tenancy. I can tell you more about the Private Residential Tenancy anyway - what would you like to know more about?",
		options: {
			"Rent, deposits and fees": 			"E1",
			"My tenancy agreement": 			"E2",
			"Your rights and responsibilities": "E3"
		}
	},
 
	

	D1: {
		text: 	"OK, that means the Private Residencial Tenancy applies to you. What would you like to know more about?", 
		options: {
			"Rent, deposits and fees": 			"E1",
			"My tenancy agreement": 			"E2",
			"My rights and responsibilities": "E3"
		}
	},

	D2: {
		text: 	"The Private Residential Tenancy applies to any tenants who moved in or signed their agreements on or after December 1st 2017. What would you like to know more about?", 
		options: {
			"Rent, deposits and fees": 	"E4",
			"Tenancy agreements": 		"E5",
			"Disputes": 				"E6"
		}
	},

	D3: {
		text: 	"Ok that means your tenants have an assured or short assured tenanacy, and the tenancy will continue as normal until you or your tenant bring it to an end following the correct procedure. If you then offer your tenant a new tenancy this will be a Private Residential Tenancy. I can tell you more about the Private Residential Tenancy anyway - what would like to know more about?", 
		options: {
			"Rent, deposits and fees": 	"E4",
			"Tenancy agreements": 		"E5",
			"Disputes": 				"E6"
		}
	},

	E1: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"Rent increases": 	"F1",
			"Deposits": 		"F2",
			"Fees": 			"F3"
		}
	},

	E2: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"I want to move out": 			"F4",
			"Length of the tenancy": 	"F5",
			"Model tenancy agreement": 	"F6"
		}
	},

	E3: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"Responsibility for repairs": 	"F7",
			"Eviction": 					"F8",
			"Rent increases": 				"F9"
		}
	},

	E4: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"Rent increases": 	"F10",
			"Deposits": 		"F11",
			"Fees": 			"F12"
		}
	},

	E5: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"Tenant wants to leave": 			"F13",
			"Length of agreements": 			"F14",
			"I want the tenant to move out": "F15",
			"The Model Tenancy Agreement": 		"F16"
		}
	},

	E6: {
		text: 	"The Private Residential Tenancy introduces some changes here, what do you want to know more about?", 
		options: {
			"Responsibility for repairs": 	"F17",
			"Evicting tenants": 			"F18",
			"Increasing rent": 				"F19",
			"First tier tribunal": 			"F20"
		}
	},

	F1: {
		text: 	"Under the Private Residential Tenancy your rent can only be increased once every 12 months. Your landlord has to give you 3 months' notice of a rent increase. If you are not happy with the proposed increase you can refer it to a rent officer for review. (Ask Government about contacting rent officer)" 
		
		//end!
	},

	F2: {
		text: 	"As before a landlord must register your deposit, with one of the 3 available schemes, within 30 working days of the tenancy starting. Find out more about the schemes https://scotland.shelter.org.uk/get_advice/advice_topics/paying_for_a_home/deposits/tenancy_deposit_schemes"

		//end!
	},

	F3: {
		text: 	"As before, a landlord, or their letting agent, should not charge you any fees. This includes fees for credit checks, reference checks, holding fees, renewal fees and any fees for getting a copy of your lease."

		//end!
	},

	F4: {
		text: 	"If at any time you want to leave the property you must give your landlord a minimum of 28 days writen notice, that you want to move out. If your landlord wants you to leave, they need to give you 28 days or 84 days notice, depending on the ground. Find out more about the eviction process. https://scotland.shelter.org.uk/get_advice/advice_topics/eviction/eviction_of_private_tenants/eviction_of_private_residential_tenancy_tenants"

		//end!
	},

	F5: {
		text: 	"The new Private Residential Tenancy will have no end date. This means that your landlord can't make you leave after a fixed period like they could with a short assured tenancy. If your landlord wants you to leave, they need to give you 28 days or 84 days notice, depending on the ground. Find out more about the eviction process. https://scotland.shelter.org.uk/get_advice/advice_topics/eviction/eviction_of_private_tenants/eviction_of_private_residential_tenancy_tenants"

		//end!
	},

	F6: {
		text: 	"You have the right to a tenancy agreement, which can be either a written or electronic copy. You should get this on the day you move in, if not, you should get one within 28 days of the start of the tenancy."
				+ "\n\n\n\nThe Scottish Government has published a model tenancy that your landlord can use to set up a tenancy. This tenancy agreement contains certain statutory terms that outline both parties rights and obligations. http://www.gov.scot/Publications/2017/10/3669"

		//end!
	},

	F7: {
		text: 	"Your landlord will need to give you either 28 or 84 days notice that they intend to apply for an eviction notice. The period of notice will depend on how long you have been in the property and which one of the 18 grounds they are using to apply for eviction. The form that your landlord needs to use is called a 'notice to leave', this replaces the old 'notice to quit'"
				+ "\n\n\n\nIf you haven't left the property after the notice period is over, then the landlord will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order. https://scotland.shelter.org.uk/get_advice/advice_topics/eviction/eviction_of_private_tenants/eviction_of_private_residential_tenancy_tenants"

		//end!
	},

	F8: {
		text: 	"Your landlord will need to give you either 28 or 84 days notice that they intend to apply for an eviction notice. The period of notice will depend on how long you havr been in the property and which one of the new 18 grounds they are applying for eviction. The form that your landlord needs to use is called a ‘notice to leave’."
				+"\n\n\n\n If you haven't  left the property after the notice period is over, then the landlord will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order."

		//end!
	},

	F9: {
		text: 	"Under the Private Residential Tenancy your rent can only be increased once every 12 months. Your landlord has to give you 3 months of a rent increase. If you are not happy with the proposed increase you can refer it to a rent officer for review. http://www.gov.scot/Topics/Built-Environment/Housing/PrivateRenting/rent-registration-service"

		//end!
	},




	F10: {
		text: 	"Under the Private Residential Tenancy the rent can only be increased once every 12 months. You have to give your tenant 3 months' notice of a rent increase. If the tenant is not happy with the proposed increase they can refer it to a rent officer for review. https://rentingscotland.org/landlords-guide/tenancy-deposits"
		//end!
	},

	F11: {
		text: 	"You must register the tenant's deposit, with one of the 3 available schemes, within 30 working days of the tenancy starting. https://rentingscotland.org/landlords-guide/tenancy-deposits"
		//end!
	},

	F12: {
		text: 	"You can't charge any fees for a tenant moving into your property, this includes fees for credit checks, reference checks, holding fees, renewal fees and  getting a copy of the lease."
		//end!
	},

	F13: {
		text: 	"If your tenant wants to leave the property they must give you at least 28 days notice, in writing, that they want to move out. The amount of notice that a tenant needs to give can be changed, if agreed and is in the tenancy agreement."
		//end!
	},

	F14: {
		text: 	"The new PRT will have no end date. This means that you can't make a tenant leave after a fixed period as you could with a short assured tenancy."

		//end!
	},

	F15: {
		text: 	"A private residential tenancy can be ended by a tenant giving notice and leaving or a tenant agreeing with the landlord to leave. If neither of these happens and the landlord is wanting possession of the property then they will have to get an eviction order from the Housing and Property Chamber of the First Tier Tribunal."
				+"\n\n\n\nYou will need to give your tenant either 28 or 84 days notice that you intend to apply for an eviction notice. The period of notice will depend on how long the tenant has been in the property and which ground you are applying for eviction. The form you need to use is called a ‘notice to leave’, this replaces the old 'notice to quit'."
				+"\n\n\n\nIf the tenant is still in the property after the notice period is over, you will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order.  https://www.housingandpropertychamber.scot/"

		//end!
	},

	F16: {
		text: 	"Tenants have a right to a tenancy agreement, which can be either a written or electronic copy. This is normally signed on the day that the tenant moves in, if not, then they should get an agreement within 28 days of the start of the tenancy. The Scottish Government has published a model tenancy that you can use to set up a tenancy. This tenancy agreement contains certain statutory terms that outline both parties rights and obligations. http://www.gov.scot/Publications/2017/10/3669"

		//end!
	},

	F17: {
		text: 	"You have to make sure the property meets the repairing standard at the start the tenancy, and to complete any outstanding repairs in a resonable time. If the property does not meet the repairing standard then the tenant can report you to the Housing and Property Chamber of the First Tier Tribunal.  https://scotland.shelter.org.uk/get_advice/advice_topics/repairs_and_bad_conditions/repairs_in_private_rented_accommodation/who_is_responsible_for_repairs"
		//end!
	},

	F18: {
		text: 	"If you are wanting possession of the property, and the tenants are refusing to move out, you will have to get an eviction order from the Housing and Property Chamber of the First Tier Tribunal."
				+"\n\n\n\nYou will need to give your tenant either 28 or 84 days notice that you intend to apply for an eviction notice. The period of notice will depend on how long the tenant has been in the property and which ground you are applying for eviction. The form you need to use is called a ‘notice to leave’, this replaces the old 'notice to quit'."
				+"\n\n\n\nIf the tenant is still in the property after the notice period is over, you will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order. Link: https://www.housingandpropertychamber.scot/"

		//end!
	},

	F19: {
		text: 	"Under the Private Residential Tenancy the rent can only be increased once every 12 months. You have to give your tenant 3 months' notice of a rent increase. If the tenant is not happy with the proposed increase they can refer it to a rent officer for review. https://rentingscotland.org/landlords-guide/tenancy-deposits"

		//end!
	},

	F20: {
		text: 	"The first tier tribunal is where all disputes between landlords and tenants, such as, repairs, evictions and deposits, will now be heard and resolved. It replaces the sheriff court system. https://www.housingandpropertychamber.scot/"

		//end!
	}

};


// =============================================
// BUILD DIALOGS

var dialogs = {};

for (var partname in script) {

	let part = script[partname];
	let txt = part.text;
	var steps = [];

	if (part.options) {

		let options = [];
		for (var opt in part.options) {
			options.push(opt);
		}

		steps.push(
			(session) => {
				analytics.view(session.message.address.conversation.id, partname);

				builder.Prompts.choice(session,
		            txt,
		            options,
		            { listStyle: builder.ListStyle.button });

			}
		);

		steps.push(
			(session, result, next) => {
				analytics.answer(session.message.address.conversation.id, result.response.entity);
				
		        for (var opt in part.options) {
					if (result.response.entity == opt)
						session.beginDialog(part.options[opt]);
				}
		    }
		);

	} else {
		steps.push(
			(session) => {
				analytics.view(session.message.address.conversation.id, partname);

				session.send(txt);

				//text-only steps are ENDS
				session.beginDialog("end");
			}
		);
	}

	dialogs[partname] = steps;

}

module.exports = dialogs;

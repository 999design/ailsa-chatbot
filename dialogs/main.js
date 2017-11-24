var builder = require("botbuilder");

// =============================================
// CONTENT


const script = {

	entry: {
		text: 	"Hello, I'm Ailsa, and I'm a robot. " + String.fromCharCode(0xD83E, 0xDD16) + " I can help you find out what the Private Residential Tenancy will mean to you if you're a private landlord or tenant. Are you a landlord or a tenant?",
		options: {
			"I'm a tenant": 	"B1",
			"I'm a landlord": 		"B2"
		}, 
		action: (session, next) => {
			console.log("action");
		}
	},

	B1: {
		text: 	"Great! Do you rent from a private landlord or a letting agent?", 
		options: {
			"Yes": 										"C1",
			"Yes, but I live with my landlord": 		"na",
			"No": 										 "na",
			"I don\"t know what type of tenancy I have": "C2",
		}
	},

	B2: {
		text: 	"Do your tenants live with you?", 
		options: {
			"Yes": 	"na",
			"No": 	"C3"
		}
	},

	C1: {
		text: 	"Did you sign your tenancy agreement or move in before 1st December 2017?", 
		options: {
			"Yes": 							"na",
			"No, after the 1st December": 	"D1"
		}
	},

	C2: {
		text: 	"Use this tool to find out, if you're a Short Assured Tenant, come back to find out how PRT might affect you.", 
		
		//restart? short assured tenant option?
	},

	C3: {
		text: 	"PRT applies to any tenants who moved in or signed their agreements on or after December 1st 2017. What would you like to know more about?", 
		options: {
			"Rent, deposits and fees": 	"D2",
			"Tenancy agreements": 		"D3",
			"Disputes": 				"D4"
		}
	},

	D1: {
		text: 	"OK, that means the Private Residencial Tenancy applies to you. What would you like to know more about?", 
		options: {
			"Rent, deposits and fees": 			"E1",
			"My tenancy agreement": 			"E2",
			"Your rights and responsibilities": "E3"
		}
	},

	D2: {
		text: 	"PRT introduces some changes here, what do you want to know more about?", 
		options: {
			"Rent increases": 	"E4",
			"Deposits": 		"E5",
			"Fees": 			"E6"
		}
	},

	D3: {
		text: 	"PRT introduces some changes here, what do you want to know more about?", 
		options: {
			"Notice periods": 					"E7",
			"Length of agreements": 			"E8",
			"Tenant rights under the agreement": "E9",
			"The Model Tenancy Agreement": 		"E10"
		}
	},

	D4: {
		text: 	"PRT introduces some changes here, what do you want to know more about?", 
		options: {
			"Responsibility for repairs": 	"E11",
			"Evicting tenants": 			"E12",
			"Increasing rent": 				"E13",
			"First tier tribunal": 			"E14",
			"Something else": 				"E15"
		}
	},

	E1: {
		text: 	"PRT introduces some changes here, what are you concerned about?", 
		options: {
			"Rent increases": 	"F1",
			"Deposits": 		"F2",
			"Fees": 			"F3"
		}
	},

	E2: {
		text: 	"PRT introduces some changes here, what are you concerned about?", 
		options: {
			"Notice Periods": 			"F4",
			"Length of the tenancy": 	"F5",
			"Model tenancy agreement": 	"F6"
		}
	},

	E3: {
		text: 	"PRT introduces some changes here, what are you concerned about?", 
		options: {
			"Responsibility for repairs": 	"F7",
			"Eviction": 					"F8",
			"Rent increases": 				"F9",
			"Something Else": 				"F10",
		}
	},

	E4: {
		text: 	"Under the PRT the rent can only be increased once every 12 months. You have to give 3 months of a rent increase. If the tenant is not happy with the proposed increase they can refer it to a rent officer for review."

		//end!
	},

	E5: {
		text: 	"You must register the tenant's deposit, with one of the 3 available schemes, within 30 working days of the tenancy starting. "

		//end!
	},

	E6: {
		text: 	"You can not charge fees for a tenant moving into your property, this includes fees for credit checks, reference checks, holding fees, renewal fees and  getting a copy of the lease."

		//end!
	},

	E7: {
		text: 	"If tenant wants to leave the property they must give you at least 28 days notice, in writing, that they want to move out. The amount of notice that a tenant needs to give can be increased, if agreed and is in the tenancy agreement. "

		//end!
	},

	E8: {
		text: 	"The new PRT will have no end date. This means that you cant make a tenant leave after a fixed period as you could with a short assured tenancy."

		//end!
	},

	E9: {
		text: 	"Content TBC"

		//end!
	},

	E10: {
		text: 	"Content TBC"

		//end!
	},

	E11: {
		text: 	"You have to make sure the property meets the repairing standard at the start the tenancy, and to complete any outstanding repairs in a resonable time. If the property does not meet the repairing standard then the tenant can report you to the Housing and Property Chamber of the First Tier Tribunal."

		//end!
	},

	E12: {
		text: 	"If you are wanting possession of the property you will have to get an eviction order from the Housing and Property Chamber of the First Tier Tribunal."
				+"\nYou will need to give your tenant either 28 or 84 days notice that you intend to apply for an eviction notice. The period of notice will depend on how long the tenant has been in the property and which ground you are applying for eviction. The form you need to use is called a ‘notice to leave’."
				+"\nIf the tenant is still in the property after the notice period is over, you will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order."

		//end!
	},

	E13: {
		text: 	"Content TBC"

		//end!
	},

	E14: {
		text: 	"Content TBC"

		//end!
	},

	E15: {
		text: 	"Content TBC"

		//end!
	},

	F1: {
		text: 	"Under the PRT your rent can only be increased once every 12 months. Your landlord has to give you 3 months of a rent increase. If you are not happy with the proposed increase you can refer it to a rent officer for review." 
		
		//end!
	},

	F2: {
		text: 	"A landlord must register your deposit, with one of the 3 available schemes, within 30 working days of the tenancy starting."

		//end!
	},

	F3: {
		text: 	"A landlord, or their letting agent, should not charge you any fees. This includes fees for credit checks, reference checks, holding fees, renewal fees and  getting a copy of your lease."

		//end!
	},

	F4: {
		text: 	"If you want to leave the property you must give your landlord a minimum of 28 days notice, in writing, that you want to move out."

		//end!
	},

	F5: {
		text: 	"The new PRT will have no end date. This means that your landlord can't make you leave after a fixed period like they could with a short assured tenancy."

		//end!
	},

	F6: {
		text: 	"Content TBC"

		//end!
	},

	F7: {
		text: 	"It is your responsibity to take good care of the property and to report any repairs to your landlord ASAP. The landlord has the responsabilty to make sure the property meets the repairing standard at the start the tenancy, and to complete any outstanding repairs in a resonable time. If the proeprty does not meet the repairing standard then you can report your landlord to the Housing and Property Chamber of the First Tier Tribunal."

		//end!
	},

	F8: {
		text: 	"Your landlord will need to give you either 28 or 84 days notice that they intend to apply for an eviction notice. The period of notice will depend on how long you havr been in the property and which one of the new 18 grounds they are applying for eviction. The form that your landlord needs to use is called a ‘notice to leave’.\n If you haven't  left the property after the notice period is over, then the landlord will then have to apply to the Housing and Property Chamber of the First Tier Tribunal for an eviction order."

		//end!
	},

	F9: {
		text: 	"Under the PRT your rent can only be increased once every 12 months. Your landlord has to give you 3 months of a rent increase. If you are not happy with the proposed increase you can refer it to a rent officer for review"

		//end!
	},

	F10: {
		text: 	"Content TBC"

		//end!
	},

	


};


// =============================================
// BUILD DIALOG

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
				
				builder.Prompts.choice(session,
		            txt,
		            options,
		            { listStyle: builder.ListStyle.button });

			}
		);

		steps.push(
			(session, result, next) => {
		        for (var opt in part.options) {
					if (result.response.entity == opt)
						session.beginDialog(part.options[opt]);
				}
		    }
		);

	} else {
		steps.push(
			function (session) {
				session.send(txt);

				//text-only steps are ENDS
				session.beginDialog("end");
			}
		);
	}

	dialogs[partname] = steps;

}

module.exports = dialogs;

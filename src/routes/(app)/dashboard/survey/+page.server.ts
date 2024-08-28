import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/db";

let userID = '';
const surSchema = z.object({
    // answers to questions here
    gitName: z.string(),
    ucfEmail: z.string().email().refine(email => email.endsWith('@ucf.edu'), {
        message: "Email must be a valid UCF email address (@ucf.edu)"
    }),
    Major: z.string().array(),
    oMajor: z.string().optional(),
    year: z.string(),
    semester: z.number(),
    shirtSize: z.string(),
    prevMem: z.string(),
    discover: z.string().array(),
    allergies: z.string().array(),
    oAllergies: z.string().optional(),
    otherConcerns: z.string().optional()
});

export const load: PageServerLoad = async ({ parent }) => {
    const data = await parent();
    userID = data.member!.id;

    // Check if user already has a survey
    const existingSurvey = await db.survey.findFirst({
        where: {
            Member: {
                some: {
                    id: userID
                }
            }
        }
    });

    if (existingSurvey) {
        throw redirect(302, '/dashboard');
    }

    const form = await superValidate(surSchema);
    return { form };
};

export const actions: Actions = {
    default: async({ request }) => {
        const form = await superValidate(request, surSchema);

        // Validating forms
        if (!form.valid) {
            return fail(400, { form });
        }

        // make ucf email be unique
        if (await db.survey.findFirst({
            where: {
                UCFemail: form.data.ucfEmail
            }
        })) {
            return setError(form, 'ucfEmail', 'Email is already being used!');
        }

        const selectedMajors = form.data.Major.filter(major => major !== '');
        const selectedyear = form.data.year;
        const selectedshirtSize = form.data.shirtSize;
        const selectedprevMem = form.data.prevMem;
        const selectedallergies = form.data.allergies.filter(allergies => allergies !== '');
        const enteredNum = form.data.semester;
        const selectedDiscover = form.data.discover.filter(allergies => allergies !== '');

        if (selectedMajors.length === 0) {
            return setError(form, 'Major', 'At least one of the options must be selected');
        }
        if (selectedMajors.includes("Other") && !form.data.oMajor) {
            return setError(form, 'oMajor', 'Please enter Major');
        }
        if (selectedyear === '') {
            return setError(form, 'year', 'At least one of the options must be selected');
        }
        if (selectedshirtSize === '') {
            return setError(form, 'shirtSize', 'At least one of the options must be selected');
        }
        if (selectedprevMem === '') {
            return setError(form, 'prevMem', 'At least one of the options must be selected');
        }
        if (selectedDiscover.length === 0) {
            return setError(form, 'discover', 'At least one of the options must be selected');
        }
        if (enteredNum < 1 && selectedprevMem === 'Yes'){
            return setError(form, 'semester', 'Please enter a number >= 0');
        }
        if (enteredNum > 30){
            return setError(form, 'semester', 'Really?');
        }
        if (selectedallergies.length === 0) {
            return setError(form, 'allergies', 'At least one of the options must be selected');
        }
        // New validation for allergies: "None" should not be selected with other allergies
        if (selectedallergies.includes("None") && selectedallergies.length > 1) {
            return setError(form, 'allergies', 'Connot have both None and allergen(s) selected');
        }
        if (selectedallergies.includes("Other") && !form.data.oAllergies) {
            return setError(form, 'oAllergies', 'Please enter Allergen(s)');
        }

        // Creating survey entry in the database
        await db.survey.create({
            data: {
                GitName: form.data.gitName,
                UCFemail: form.data.ucfEmail,
                Major: form.data.Major,
                OtherMajors: form.data.oMajor,
                Year: form.data.year,
                NumberofSemesters: form.data.semester,
                ShirtSize: form.data.shirtSize,
                PrevMem: form.data.prevMem,
                DiscoveredThrough: form.data.discover,
                Allergies: form.data.allergies,
                OtherAllergies: form.data.oAllergies,
                Concerns: form.data.otherConcerns,
                Member: {
                    connect: {
                        id: userID
                    }
                }
            }
        });

        throw redirect(302, '/dashboard');
    }
};

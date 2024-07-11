export async function addTask(prevState: any, formData: FormData): Promise<{ message: string }> {
    console.log({ prevState });
    // Schema parse using zod
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const sectionType = formData.get("sectionType");

    console.log({ title, description, dueDate, sectionType });

    return {
        message: "Passed",
    };
    // try {

    // } catch (error) {}
}

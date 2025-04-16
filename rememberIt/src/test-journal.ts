// Import only what we need for the basic test
import { createJournal } from "./journal/journalFS";

export async function testJournalCreation() {
  try {
    // Define your workspace path
    const workspacePath = "/Users/mikey/Documents/rememberIt";

    // Create a new journal
    const newJournal = await createJournal(workspacePath, {
      name: "Test Journal",
      description: "A test journal",
      color: "primary",
    });

    console.log("Journal created:", newJournal);
    console.log("Test the journal directory to see if an entry was created");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testJournalCreation();

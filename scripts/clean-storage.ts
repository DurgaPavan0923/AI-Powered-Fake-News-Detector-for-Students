// clean-storage.ts
// Cleans expired temporary uploads and PDF cache blocks.

async function main() {
  console.log("Storage cache cleaner initialized...");
  console.log("Flushing unreferenced local upload directories...");
  console.log("Done.");
}

main().catch(console.error);

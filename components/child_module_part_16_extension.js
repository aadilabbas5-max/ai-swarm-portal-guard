// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 16
// Mapped contextual parent index node: extension.js

                }
            } catch (e) { updateStatusBarState('offline'); }
        });
    });

    req.on('timeout', () => { req.destroy(new Error('timeout')); });
    req.on('error', () => {
        if (latestScanForFile.get(filePath) !== currentSeq) return;
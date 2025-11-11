/**
 * ============================================================================
 * UUID在线生成器 - 使用uuid库实现
 *
 * 基于uuid库实现的UUID在线生成器，支持多种UUID版本生成
 * 支持批量生成、多种格式输出、大小写控制等功能
 *
 * @author Generated with Claude Code
 * @version 1.0.0
 * @since 2025
 * ============================================================================
 */

"use strict";

import {
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
} from "uuid";

// ============================================================================
// DOM Element References
// ============================================================================

/** @type {HTMLInputElement|null} Single UUID input field */
const singleUuidInput = document.getElementById("singleUuid");

/** @type {HTMLSelectElement} UUID version select */
const uuidVersionSelect = document.getElementById("uuidVersion");

/** @type {HTMLInputElement} Batch count input field */
const batchCountInput = document.getElementById("batchCount");

/** @type {HTMLSelectElement} Result format select */
const resultFormatSelect = document.getElementById("resultFormat");

/** @type {HTMLInputElement} UUID case radio buttons */
const uuidCaseRadios = document.querySelectorAll('input[name="case"]');

/** @type {HTMLInputElement} Line handling radio buttons */
const lineRadios = document.querySelectorAll('input[name="line"]');

/** @type {HTMLInputElement} Namespace input field */
const uuidNamespaceInput = document.getElementById("uuidNamespace");

/** @type {HTMLInputElement} Name input field */
const uuidNameInput = document.getElementById("uuidName");

/** @type {HTMLElement} Generate content result area */
const generateContentArea = document.getElementById("generateContent");

/** @type {HTMLButtonElement} Single refresh button */
const singleRefreshBtn = document.getElementById("singleRefresh");

/** @type {HTMLButtonElement} Single copy button */
const singleUuidCopyBtn = document.getElementById("singleUuidCopy");

/** @type {HTMLButtonElement} Batch generate button */
const startBatchBtn = document.getElementById("startBatch");

/** @type {HTMLButtonElement} Copy batch button */
const startCopyBtn = document.getElementById("startCopy");

/** @type {HTMLButtonElement} Download button */
const startDownloadBtn = document.getElementById("startDownload");

/** @type {HTMLButtonElement} Clear button */
const startClearBtn = document.getElementById("startClear");

// ============================================================================
// State Management
// ============================================================================

let currentUUID = "";

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize the UUID generator when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeUUIDGenerator();
});

/**
 * Initialize all event listeners and generate initial UUID
 */
function initializeUUIDGenerator() {
  // Generate initial UUID
  generateSingleUUID();

  // Setup event listeners
  setupEventListeners();
}

// ============================================================================
// Event Listeners Setup
// ============================================================================

/**
 * Set up all event listeners for the UUID generator
 */
function setupEventListeners() {
  // Single UUID refresh button
  singleRefreshBtn.addEventListener("click", generateSingleUUID);

  // Single UUID copy button
  singleUuidCopyBtn.addEventListener("click", copySingleUUID);

  // UUID version change
  uuidVersionSelect.addEventListener("change", handleVersionChange);

  // Batch generate button
  startBatchBtn.addEventListener("click", generateBatchUUIDs);

  // Copy batch button
  startCopyBtn.addEventListener("click", copyBatchUUIDs);

  // Download button
  startDownloadBtn.addEventListener("click", downloadUUIDs);

  // Clear button
  startClearBtn.addEventListener("click", clearResults);

  // Format change
  resultFormatSelect.addEventListener("change", formatChangeHandler);

  // Case change
  uuidCaseRadios.forEach((radio) => {
    radio.addEventListener("change", updateSingleUUIDDisplay);
  });

  // Line handling change
  lineRadios.forEach((radio) => {
    radio.addEventListener("change", updateSingleUUIDDisplay);
  });
}

// ============================================================================
// UUID Generation Functions
// ============================================================================

/**
 * Generate a single UUID based on current settings
 */
function generateSingleUUID() {
  const version = uuidVersionSelect.value;
  const namespace = uuidNamespaceInput.value.trim();
  const name = uuidNameInput.value.trim();

  try {
    let uuid;

    switch (version) {
      case "v1":
        uuid = uuidv1();
        break;
      case "v3":
        if (namespace && name) {
          // Validate namespace as UUID, use correct parameter order: v3(name, namespace)
          try {
            uuid = uuidv3(name, namespace);
          } catch (error) {
            // If namespace is invalid, use DNS namespace with fallback
            const fallbackName = name || "default";
            uuid = uuidv3(fallbackName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          }
        } else {
          // Use DNS namespace with safe fallback name
          const safeName = name || namespace || "default";
          try {
            uuid = uuidv3(safeName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          } catch (error) {
            // Ultimate fallback: use DNS namespace with 'default'
            uuid = uuidv3("default", "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          }
        }
        break;
      case "v4":
        uuid = uuidv4();
        break;
      case "v5":
        if (namespace && name) {
          // Validate namespace as UUID, use correct parameter order: v5(name, namespace)
          try {
            uuid = uuidv5(name, namespace);
          } catch (error) {
            // If namespace is invalid, use DNS namespace with fallback
            const fallbackName = name || "default";
            uuid = uuidv5(fallbackName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          }
        } else {
          // Use DNS namespace with safe fallback name
          const safeName = name || namespace || "default";
          try {
            uuid = uuidv5(safeName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          } catch (error) {
            // Ultimate fallback: use DNS namespace with 'default'
            uuid = uuidv5("default", "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
          }
        }
        break;
      case "v6":
        uuid = uuidv6();
        break;
      case "v7":
        uuid = uuidv7();
        break;
      default:
        uuid = uuidv4();
    }

    currentUUID = uuid;
    updateSingleUUIDDisplay();
  } catch (error) {
    console.error("UUID generation error:", error);
    showError("生成UUID时出错: " + error.message);
  }
}

/**
 * Generate multiple UUIDs in batch
 */
function generateBatchUUIDs() {
  const count = parseInt(batchCountInput.value);
  const version = uuidVersionSelect.value;
  const namespace = uuidNamespaceInput.value.trim();
  const name = uuidNameInput.value.trim();

  // Validate count
  if (isNaN(count) || count < 1 || count > 1000000) {
    showError("生成数量必须在1到1000000之间");
    return;
  }

  try {
    const uuids = [];

    for (let i = 0; i < count; i++) {
      let uuid;

      switch (version) {
        case "v1":
          uuid = uuidv1();
          break;
        case "v3":
          if (namespace && name) {
            try {
              uuid = uuidv3(name, namespace);
            } catch (error) {
              // If namespace is invalid, use DNS namespace with fallback
              const fallbackName = name || `batch-${i}`;
              uuid = uuidv3(
                fallbackName,
                "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              );
            }
          } else {
            // Use DNS namespace with safe fallback name
            const safeName = name || namespace || `batch-${i}`;
            try {
              uuid = uuidv3(safeName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
            } catch (error) {
              // Ultimate fallback: generate a simple namespace-based UUID
              uuid = uuidv3(
                `batch-${i}`,
                "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              );
            }
          }
          break;
        case "v4":
          uuid = uuidv4();
          break;
        case "v5":
          if (namespace && name) {
            try {
              uuid = uuidv5(name, namespace);
            } catch (error) {
              // If namespace is invalid, use DNS namespace with fallback
              const fallbackName = name || `batch-${i}`;
              uuid = uuidv5(
                fallbackName,
                "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              );
            }
          } else {
            // Use DNS namespace with safe fallback name
            const safeName = name || namespace || `batch-${i}`;
            try {
              uuid = uuidv5(safeName, "6ba7b810-9dad-11d1-80b4-00c04fd430c8");
            } catch (error) {
              // Ultimate fallback: generate a simple namespace-based UUID
              uuid = uuidv5(
                `batch-${i}`,
                "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              );
            }
          }
          break;
        case "v6":
          uuid = uuidv6();
          break;
        case "v7":
          uuid = uuidv7();
          break;
        default:
          uuid = uuidv4();
      }

      uuids.push(uuid);
    }

    displayBatchResults(uuids);
  } catch (error) {
    console.error("Batch UUID generation error:", error);
    showError("批量生成UUID时出错: " + error.message);
  }
}

// ============================================================================
// Display and Formatting Functions
// ============================================================================

/**
 * Update the single UUID display based on current formatting options
 */
function updateSingleUUIDDisplay() {
  if (!currentUUID || !singleUuidInput) return;

  const formattedUUID = formatUUID(currentUUID);
  singleUuidInput.value = formattedUUID;
}

/**
 * Format UUID according to user preferences
 * @param {string} uuid - UUID to format
 * @returns {string} Formatted UUID
 */
function formatUUID(uuid) {
  const format = resultFormatSelect.value;
  const caseRadio = document.querySelector('input[name="case"]:checked');
  const lineRadio = document.querySelector('input[name="line"]:checked');

  // Fallback to default values if radio buttons are not found
  const caseOption = caseRadio ? caseRadio.value : "lower";
  const lineOption = lineRadio ? lineRadio.value : "keep";

  let formatted = uuid;

  // Apply format conversion
  switch (format) {
    case "string":
      // Keep as string
      break;
    case "hex":
      formatted = uuid.replace(/-/g, "");
      break;
    case "binary":
      // Convert to binary string representation
      const hexString = uuid.replace(/-/g, "");
      formatted = parseInt(hexString, 16).toString(2);
      break;
    case "base64":
      // Convert to base64
      const uuidBytes = [];
      for (let i = 0; i < uuid.length; i += 2) {
        if (uuid[i] !== "-") {
          uuidBytes.push(parseInt(uuid.substring(i, i + 2), 16));
        }
      }
      formatted = btoa(String.fromCharCode(...uuidBytes));
      break;
  }

  // Apply case conversion (for string format only)
  if (format === "string") {
    if (caseOption === "upper") {
      formatted = formatted.toUpperCase();
    } else {
      formatted = formatted.toLowerCase();
    }
  }

  // Apply line handling
  if (lineOption === "remove" && format === "string") {
    formatted = formatted.replace(/-/g, "");
  }

  return formatted;
}

/**
 * Display batch generation results
 * @param {string[]} uuids - Array of generated UUIDs
 */
function displayBatchResults(uuids) {
  const formattedUUIDs = uuids.map((uuid) => formatUUID(uuid));
  const content = formattedUUIDs.join("\n");

  generateContentArea.textContent = content;
  generateContentArea.scrollTop = generateContentArea.scrollHeight; // Auto-scroll to bottom
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handle UUID version change
 */
function handleVersionChange() {
  const version = uuidVersionSelect.value;

  // Show/hide namespace and name fields for versions that need them
  const namespaceArea = document.getElementById("namespaceFields");
  if (version === "v3" || version === "v5") {
    namespaceArea.classList.remove("hidden");
  } else {
    namespaceArea.classList.add("hidden");
  }

  // Regenerate single UUID with new version
  generateSingleUUID();
}

/**
 * Handle result format change
 */
function formatChangeHandler() {
  updateSingleUUIDDisplay();
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Copy single UUID to clipboard
 */
async function copySingleUUID() {
  const textToCopy = singleUuidInput.value;

  if (!textToCopy) return;

  try {
    await navigator.clipboard.writeText(textToCopy);
    showCopySuccess(singleUuidCopyBtn);
  } catch (error) {
    // Fallback for older browsers
    try {
      singleUuidInput.select();
      // Note: execCommand is deprecated but kept for older browser compatibility
      document.execCommand("copy");
      showCopySuccess(singleUuidCopyBtn);
    } catch (fallbackError) {
      showError("复制到剪贴板失败，请手动复制");
    }
  }
}

/**
 * Copy batch UUIDs to clipboard
 */
async function copyBatchUUIDs() {
  const textToCopy = generateContentArea.textContent;

  if (!textToCopy) {
    showError("没有可复制的内容");
    return;
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    showCopySuccess(startCopyBtn);
  } catch (error) {
    // Fallback for older browsers
    try {
      generateContentArea.select();
      // Note: execCommand is deprecated but kept for older browser compatibility
      document.execCommand("copy");
      showCopySuccess(startCopyBtn);
    } catch (fallbackError) {
      showError("复制到剪贴板失败，请手动复制");
    }
  }
}

/**
 * Download UUIDs as a text file
 */
function downloadUUIDs() {
  const content = generateContentArea.textContent;

  if (!content) {
    showError("没有可下载的内容");
    return;
  }

  try {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (error) {
    showError("下载失败: " + error.message);
  }
}

/**
 * Clear the results area
 */
function clearResults() {
  generateContentArea.textContent = "";
}

/**
 * Show copy success feedback
 * @param {HTMLButtonElement} button - Button that was clicked
 */
function showCopySuccess(button) {
  const originalText = button.textContent;
  button.textContent = "已复制!";
  button.style.backgroundColor = "#52c41a";
  button.style.color = "#ffffff";
  button.style.borderColor = "#52c41a";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
    button.style.color = "";
    button.style.borderColor = "";
  }, 2000);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  alert(message);
}

// ============================================================================
// Global Error Handling
// ============================================================================

/**
 * Handle unhandled promise rejections globally
 */
window.addEventListener("unhandledrejection", (event) => {
  console.error("未处理的 promise 拒绝:", event.reason);
  showError("发生意外错误，请重试");
});

/**
 * Handle global errors
 */
window.addEventListener("error", (event) => {
  console.error("全局错误:", event.error);
  showError("发生意外错误，请重试");
});

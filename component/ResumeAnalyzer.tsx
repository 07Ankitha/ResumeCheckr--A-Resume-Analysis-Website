"use client";

import { useState } from "react";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface ResumeAnalysis {
  name: boolean;
  contact: boolean;
  address: boolean;
  skills: boolean;
  experience: boolean;
  projects: boolean;
  interests: boolean;
  certifications: boolean;
  length: boolean;
  grammar: boolean;
}

interface AnalysisResult {
  score: number;
  analysis: ResumeAnalysis;
  feedback: string[];
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change event triggered");
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log(
        "Selected file:",
        selectedFile.name,
        "Size:",
        selectedFile.size,
        "Type:",
        selectedFile.type
      );

      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size should be less than 5MB", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "16px",
            borderRadius: "8px",
          },
        });
        setError("File size should be less than 5MB");
        return;
      }

      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Please upload a PDF or Word document", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "16px",
            borderRadius: "8px",
          },
        });
        setError("Please upload a PDF or Word document");
        return;
      }

      setFile(selectedFile);
      setAnalysis(null);
      setError(null);

      // Show success toast with file details
      toast.success(
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">
            Resume Uploaded Successfully!
          </div>
          <div className="text-sm text-gray-600">{selectedFile.name}</div>
          <div className="text-xs text-gray-500">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </div>
        </div>,
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#DCFCE7",
            color: "#166534",
            padding: "16px",
            borderRadius: "8px",
            minWidth: "300px",
          },
        }
      );
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      console.log("No file selected");
      toast.error("Please select a file first");
      setError("Please select a file first");
      return;
    }

    console.log("Starting resume analysis");
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      console.log("Sending file to API:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      console.log("API Response status:", response.status);
      const responseText = await response.text();
      console.log("API Response text:", responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: responseText };
        }
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const result = JSON.parse(responseText);
      console.log("Analysis result:", result);
      setAnalysis(result);
      toast.success("Resume analyzed successfully");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to analyze resume";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const criteria = [
    { key: "name", label: "Name" },
    { key: "contact", label: "Contact Details" },
    { key: "address", label: "Address" },
    { key: "skills", label: "Skills Set" },
    { key: "experience", label: "Work Experience" },
    { key: "projects", label: "Projects" },
    { key: "interests", label: "Interests/Hobbies" },
    { key: "certifications", label: "Certifications" },
    { key: "length", label: "Appropriate Length" },
    { key: "grammar", label: "Grammar & Spelling" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Analyzer</h2>
          <DocumentTextIcon className="h-8 w-8 text-blue-600" />
        </div>

        <div className="space-y-6">
          {/* Resume Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Resume Analysis
            </h3>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF or Word document (MAX. 5MB)
                  </p>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Show selected file */}
            {file && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="h-6 w-6 text-green-600" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-green-900">
                        Selected Resume
                      </span>
                      <span className="text-sm text-green-800">
                        {file.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={!file || isAnalyzing}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                !file || isAnalyzing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {error && (
            <div className="flex items-center p-4 mb-4 text-red-800 bg-red-50 rounded-lg">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {analysis && (
            <div className="mt-8">
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {analysis.score}%
                  </div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Analysis Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {criteria.map((criterion) => (
                    <div
                      key={criterion.key}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {analysis.analysis[
                        criterion.key as keyof ResumeAnalysis
                      ] ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm text-gray-700">
                        {criterion.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Feedback
                  </h3>
                  <ul className="space-y-2">
                    {analysis.feedback.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

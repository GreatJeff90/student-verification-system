// components/VerificationResult/VerificationResult.tsx
interface VerificationResultProps {
  result: {
    success: boolean
    message: string
    student?: {
      id: string
      name: string
      matricNumber: string
      department: string
    }
    timestamp?: string
  }
  onRetry: () => void
}

export default function VerificationResult({ result, onRetry }: VerificationResultProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className={`bg-white rounded-lg shadow-md p-6 text-center ${
          result.success ? 'border-green-200' : 'border-red-200'
        } border-2`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            result.success ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.success ? (
              <CheckIcon className="w-8 h-8 text-green-600" />
            ) : (
              <XIcon className="w-8 h-8 text-red-600" />
            )}
          </div>

          <h2 className={`text-xl font-semibold mb-2 ${
            result.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.success ? 'Verification Successful' : 'Verification Failed'}
          </h2>

          <p className="text-gray-600 mb-4">
            {result.message}
          </p>

          {result.success && result.student && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <h3 className="font-semibold mb-2">Student Details:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {result.student.name}</p>
                <p><strong>Matric No:</strong> {result.student.matricNumber}</p>
                <p><strong>Department:</strong> {result.student.department}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={onRetry}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Verify Another Student
            </button>
            
            {result.success && (
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Record Attendance
              </button>
            )}
          </div>

          {result.timestamp && (
            <p className="text-xs text-gray-500 mt-4">
              Verified at: {new Date(result.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
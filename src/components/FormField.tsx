interface FormFieldProps {
    label: string
    error?: string
    required?: boolean
    children: React.ReactNode
}

export default function FormField({
    label,
    error,
    required,
    children,
}: FormFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
        </div>
    )
}
import AppKit
import AVFoundation
import Foundation

guard CommandLine.arguments.count == 6 else {
  fputs("Usage: extract-video-frames <input> <output-dir> <start-seconds> <duration-seconds> <frame-count>\n", stderr)
  exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)

guard
  let startSeconds = Double(CommandLine.arguments[3]),
  let durationSeconds = Double(CommandLine.arguments[4]),
  let frameCount = Int(CommandLine.arguments[5]),
  frameCount > 1,
  durationSeconds > 0
else {
  fputs("Invalid time range or frame count.\n", stderr)
  exit(2)
}

try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

let asset = AVURLAsset(url: inputURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

for index in 0..<frameCount {
  let progress = Double(index) / Double(frameCount - 1)
  let seconds = startSeconds + durationSeconds * progress
  let time = CMTime(seconds: seconds, preferredTimescale: 600)
  let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
  let bitmap = NSBitmapImageRep(cgImage: cgImage)
  guard let data = bitmap.representation(using: .png, properties: [:]) else {
    throw NSError(domain: "FrameExtraction", code: 1)
  }

  let name = String(format: "frame-%03d.png", index)
  try data.write(to: outputURL.appendingPathComponent(name))
}

print("Extracted \(frameCount) frames to \(outputURL.path)")

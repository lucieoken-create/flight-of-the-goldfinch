// The final landing pose is sampled from the same reproduction shown by the
// panel. These coordinates clip the actual paint; they do not generate a bird.
export const PAINTED_REST = {
  width: 1179, height: 1800,
  crop: [485, 407, 522, 603],
  foot: [1179 / 2 + 1638 / 2500 * .211 * 1800, .488 * 1800],
  head: [917, 477], tail: [501, 992],
};

// A little of the original brush edge belongs to the silhouette. The lower
// tail crosses the perch in the source, so it must not be cropped at the feet.
export const PAINTED_REST_OUTLINE = 'M 501 995 L 510 962 L 522 934 L 553 899 L 569 870 L 591 842 L 577 851 L 552 852 L 530 843 L 541 820 L 564 791 L 596 760 L 611 738 L 622 707 L 648 681 L 676 655 L 699 630 L 711 606 L 733 580 L 761 554 L 780 541 L 806 539 L 828 526 L 836 488 L 845 462 L 859 440 L 881 423 L 908 415 L 937 417 L 961 424 L 975 443 L 980 476 L 984 513 L 989 544 L 997 579 L 997 613 L 989 651 L 974 688 L 947 720 L 919 748 L 895 777 L 864 805 L 829 825 L 799 841 L 783 849 L 792 860 L 829 875 L 857 877 L 881 895 L 894 916 L 883 925 L 868 907 L 856 901 L 843 904 L 841 918 L 831 915 L 825 897 L 795 885 L 771 880 L 748 866 L 732 850 L 698 840 L 665 840 L 635 857 L 604 878 L 580 908 L 560 940 L 540 956 L 524 971 L 512 998 Z';

export function paintedRestPose() {
  // Convert source pixels to the same bird-space scale as perchRegistration.
  const scale = 184 / (.223 * PAINTED_REST.height);
  const convert = point => point.map(v => v * scale);
  return {
    rect: convert(PAINTED_REST.crop),
    foot: convert(PAINTED_REST.foot), head: convert(PAINTED_REST.head), tail: convert(PAINTED_REST.tail),
    original: true,
  };
}

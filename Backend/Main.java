import java.util.Scanner;
public class Main { 
  public static void main(String[] args) {
    // Your Java code here
Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();

        while (t-->0) {
            int n = scanner.nextInt();
            int k = scanner.nextInt();
            int[] a = new int[n];

            for (int i = 0; i < n; i++) {
                a[(i + k) % n] = scanner.nextInt();
            }

            for (int l : a) {
                System.out.print(l + " ");
            }

            System.out.println();
        }

  }
}
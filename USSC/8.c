#include <stdio.h>
#include <stdlib.h>

int sort (double *a, int M,, double *b, int N);
int func ();

int sort (double *a, int M,, double *b, int N)
{
	int i, j;
	double temp;
	
	for (i = 0; i < M; i++)
	{
		for (j = i + 1; j < M; j++)
		{
			if (a[i] > a[j])
			{
				temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
		}
	}

	for (i = 0; i < N; i++)
	{
		for (j = i + 1; j < N; j++)
		{
			if (b[i] > b[j])
			{
				temp = b[i];
				b[i] = b[j];
				b[j] = temp;
			}
		}
	}
}

int func ()

int main (void)
{
	double prev1, prev2, cur, *a, *b;
	int M = 1, N = 1, max_M = 2, max_N = 2, result;

	FILE*ina = fopen("ina.txt", "r");
	FILE*inb = fopen("inb.txt", "r");
	FILE*out = fopen("output.txt", "w");

	if ((ina == NULL) || (inb == NULL))
	{
		printf("file error");
		fclose(ina);
		fclose(inb);
		fclose(out);
		return -1;
	}

	if ( (fscanf(ina, "%lf", &prev1) <= 0) || (fscanf(inb, "%lf", &prev2) <= 0) )
	{
		printf("file empty");
		fclose(ina);
		fclose(inb);
		fclose(out);
		return -1;
	}

	a = (double *) malloc (max_M * sizeof(double));
	a[0] = prev1;
	
	while (fscanf(ina, "%lf", &cur) == 1)
	{
		M++;
		if (M > max_M)
		{
			max_M *= 2;
			a = (double *) realloc (a, max_M * sizeof(double));
		}
		a[M-1] = cur;
	}

	b = (double *) malloc (max_N * sizeof(double));
	b[0] = prev2;
	
	while (fscanf(inb, "%lf", &cur) == 1)
	{
		N++;
		if (N > max_N)
		{
			max_N *= 2;
			b = (double *) realloc (b, max_N * sizeof(double));
		}
		b[N-1] = cur;
	}
		
	sort(a, M, b, N);
	result += func(a, M, b, N);

	printf("%d", result);
	fprintf(out, "%d", result);

	free(a);
	free(b);
	fclose(ina);
	fclose(inb);
	fclose(out);
	return 0;
}
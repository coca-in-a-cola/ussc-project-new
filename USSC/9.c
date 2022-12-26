#include <stdio.h>
#include <stdlib.h>

int sort (int *a, int *b, int N);
int func();

int sort (int *a, int *b, int N)
{
	int i, j, temp;
		
	for (i = 0; i < N; i++)
	{
		for (j = i + 1; j < N; j++)
		{
			if (a[i] > a[j])
			{
				temp = a[i];
				a[i] = a[j];
				a[j]  = temp;
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
				b[j]  = temp;
			}
		}
	}
}

int func()
{
}

int main (void)
{
	int N = 1, max_N = 2, *a, *b, cur, prev1, prev2, result1, result2;

	FILE*ina = fopen("ina.txt", "r");
	FILE*inb = fopen("inb.txt", "r");
	FILE*out = fopen("output.txt", "w");

	if ( (ina == NULL) || (inb == NULL) )
	{
		printf("file error");
		fclose(ina);
		fclose(inb);
		fclose(out);
		return -1;
	}

	if ( (fscanf(ina, "%d", &prev1) <= 0) || (fscanf(inb, "%d", &prev2) <= 0) )
	{
		printf("file empty");
		fclose(ina);
		fclose(inb);
		fclose(out);
		return -1;
	}

	a = (int *) malloc (max_N *sizeof(int));
	a[0] = prev1;

	while (fscanf(ina, "%d", &cur) == 1)
	{
		N++;
		if (N > max_N)
		{
			max_N *= 2;	
			a = (int *) realloc (a, max_N * sizeof(int));
		}
		a[N-1] = cur;
	}

	b = (int *) malloc (N *sizeof(int));
	for (int i = 0, i < N, i++)
	{
		fscanf(inb, "%d", &b[i]); 
	}

	result1 = func();
	if (result1 == 0)
	{
		printf("YES ");
		fprintf(out, "YES ");
	}
	else 
	{
		printf("NO ");
		fprintf(out, "NO ");
	}

	result2 = func();
	if (result2 == 0)
	{
		printf("YES ");
		fprintf(out, "YES ");
	}

	else 
	{
		printf("NO ");
		fprintf(out, "NO ");
	}
	
	free(a);
	free(b);
	fclose(ina);
	fclose(inb);
	fclose(out);
	return 0;
}